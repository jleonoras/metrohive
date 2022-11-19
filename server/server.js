import express from "express";
import bcrypt from "bcryptjs";
import bodyParser from "body-parser";
import { connectDatabase } from "./pool.js";
import { generateJwt } from "./jwt/jwtGenerator.js";
import { auth } from "./middleware/auth.js";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";
import { upload } from "./middleware/upload.js";
import fs from "fs";
import path from "path";

const app = express();
const pool = connectDatabase();
const port = 8000;

app.use(cors());
app.use(express.json()); // req.body
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/image", express.static("public/uploads"));

app.get("/", (request, response) => {
  response.json({
    status: "success",
  });
});

// Register User
app.post("/api/v1/register", async (request, response) => {
  try {
    //take the email and password from the req.body
    const { fname, lname, email, password } = request.body;

    //Check if the account is already existing
    const user = await pool.query(
      `SELECT * FROM public.user WHERE email = $1`,
      [email]
    );
    if (user.rows.length !== 0) {
      return response.status(401).json("Email already exist!");
    }

    //Setup Bcrypt for password hashing

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const bcryptPassword = await bcrypt.hash(password, salt);

    //Add the new user into the database
    const newUser = await pool.query(
      "INSERT INTO public.user (user_id, fname, lname, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [uuidv4(), fname, lname, email, bcryptPassword]
    );

    //generate and return the JWT token
    const token = generateJwt(newUser.rows[0]);

    response.json({ token });
  } catch (error) {
    console.log(error.message);
    response.status(500).send(error.message);
  }
});

// Login user
app.post("/api/v1/login", async (request, response) => {
  try {
    //take the email and password from the req.body
    const { email, password } = request.body;

    //Check if the email is not exist
    const user = await pool.query(
      "SELECT * FROM public.user WHERE email = $1",
      [email]
    );
    if (user.rows.length === 0) {
      return response.status(401).json("Password or Email is incorrect!");
    }

    //Check if the password matches using bcrypt
    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return response.status(401).json("Password or Email is incorrect!");
    }

    //generate and return the JWT
    const token = generateJwt(user.rows[0]);
    response.json({ token });
  } catch (error) {
    console.error(error.message);
    response.status(500).send({
      msg: "Unauthenticated",
    });
  }
});

// provide the auth middleware
app.get("/api/v1/profile", auth, async (request, response) => {
  try {
    //return the user object
    // response.json(request.user.user_id);
    // response.json(request.user);

    const user = await pool.query(
      "SELECT user_id, fname, lname, email FROM public.user WHERE user_id = $1",
      [request.user.user_id]
    );
    response.json(user.rows[0]);
  } catch (error) {
    console.error(error.message);
    response.status(500).send({
      msg: "Unauthenticated",
    });
  }
});

// Verify the current user token if authenticated
app.get("/api/v1/verify", auth, async (request, response) => {
  try {
    // response.json(request.user);
    response.json(true);
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ msg: "Unauthenticated" });
  }
});

// Add New Listing
app.post(
  "/api/v1/user/new/listing",
  auth,
  upload.array("file", 3),
  async (request, response) => {
    try {
      const {
        image1 = request.files[0].filename,
        image2 = request.files[1].filename,
        image3 = request.files[2].filename,
      } = request.files;

      const { description, location, price } = request.body;

      const userId = request.user.user_id;

      // console.log(request.body);
      // console.log(request.files);

      const newListing = await pool.query(
        "INSERT INTO public.listing (description, location, price, image1, image2, image3, user_id) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [description, location, price, image1, image2, image3, userId]
      );
      response.json(newListing.rows[0]);
    } catch (error) {
      console.log(error);
    }
  }
);

// View User Listing
app.get("/api/v1/user/listing", auth, async (request, response) => {
  try {
    const userListing = await pool.query(
      "SELECT public.user.fname, public.user.email, public.listing.listing_id, public.listing.description, public.listing.location, public.listing.price, public.listing.image1, public.listing.image2, public.listing.image3 FROM public.user LEFT JOIN public.listing ON public.user.user_id = public.listing.user_id WHERE public.user.user_id = $1 ORDER BY public.listing.listing_id DESC",
      [request.user.user_id]
    );

    response.json(userListing.rows);
    // console.log(user.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// Get All Listing
app.get("/api/v1/listing", async (request, response) => {
  try {
    const listing = await pool.query(
      "Select listing_id, description, location, price, image1, image2, image3 FROM public.listing ORDER BY public.listing.listing_id DESC"
    );

    response.json(listing.rows);
  } catch (error) {
    console.log(error);
  }
});

// Get single listing
app.get("/api/v1/listing/:id", async (request, response) => {
  try {
    const listingId = request.params.id;
    const listing = await pool.query(
      "SELECT public.user.fname, public.user.lname, public.user.email, public.listing.listing_id, public.listing.description, public.listing.location, public.listing.price, public.listing.image1, public.listing.image2, public.listing.image3 FROM public.user LEFT JOIN public.listing ON public.user.user_id = public.listing.user_id WHERE public.listing.listing_id = $1",
      [listingId]
    );
    response.json(listing.rows);
  } catch (error) {
    console.log(error);
  }
});

// Update listing
app.put("/api/v1/listing/:id", auth, async (request, response) => {
  try {
    const listingId = request.params.id;
    const userId = request.user.user_id;
    const { price, description, location } = request.body;
    const dbUpdateQuery =
      "UPDATE public.listing SET price = $1, description = $2, location = $3 WHERE user_id = $4 AND listing_id = $5 RETURNING *";
    const updateListing = await pool.query(dbUpdateQuery, [
      price,
      description,
      location,
      userId,
      listingId,
    ]);

    if (updateListing.rows.length === 0) {
      return response.json(
        "You are not authorize to edit/update this listing!"
      );
    }

    response.json(userListing.rows);
  } catch (error) {
    console.log(error);
  }
});

//  Delete listing
app.delete("/api/v1/listing/:id", auth, async (request, response) => {
  try {
    const listingId = request.params.id;
    const userId = request.user.user_id;

    const dbDeleteQuery =
      "DELETE FROM public.listing WHERE listing_id = $1 AND user_id = $2 RETURNING *";

    const deleteListing = await pool.query(dbDeleteQuery, [listingId, userId]);

    if (deleteListing.rows.length === 0) {
      return response.json("You are not authorize to delete this listing!");
    }

    // app.delete("/image/:name", controller.remove);

    // response.json("Listing was deleted!");
    response.json(deleteListing.rows);
  } catch (error) {
    console.log(error);
  }
});

// Delete listing image
app.delete("/image/:name", auth, (request, response) => {
  const fileName = request.params.name;

  const __dirname = path.resolve();
  const directoryPath = path.join(__dirname, "/public/uploads/");

  try {
    // for (let i = 0; i < fileName.length; i++) {
    //   fileName += fileName[i];
    // }

    fs.unlinkSync(directoryPath + fileName);

    response.status(200).send({
      message: "Image is deleted!",
    });
  } catch (error) {
    response.status(500).send({
      message: "Could not delete the file. " + error,
    });
  }
});

pool.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    app.listen(port, () => {
      console.log(`Server has started and running on http://localhost:${port}`);
    });
  }
});
