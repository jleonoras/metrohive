import express from "express";
import bcrypt from "bcryptjs";
import bodyParser from "body-parser";
import { connectDatabase } from "./pool.js";
import { generateJwt } from "./jwt/jwtGenerator.js";
import { auth } from "./middleware/auth.js";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";

const app = express();
const pool = connectDatabase();
const port = 8000;

app.use(cors());
app.use(express.json()); // req.body
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (request, response) => {
  response.json({
    status: "success",
  });
});

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

app.get("/api/v1/verify", auth, async (request, response) => {
  try {
    // response.json(request.user);
    response.json(true);
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ msg: "Unauthenticated" });
  }
});

// Create new listing
app.post("/api/v1/listing", auth, async (request, response) => {
  try {
    console.log(request.body);

    const {
      description,
      location,
      price,
      image1,
      image2,
      image3,
      image4,
      image5,
      user_id,
    } = request.body;

    const newListing = await pool.query(
      "INSERT INTO public.listing (description, location, price, image1, image2, image3, image4, image5, user_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [
        description,
        location,
        price,
        image1,
        image2,
        image3,
        image4,
        image5,
        request.user.user_id,
      ]
    );
    response.json(newListing.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

// View User Listing
app.get("/api/v1/user-listing", auth, async (request, response) => {
  try {
    const userListing = await pool.query(
      "SELECT public.user.fname, public.user.email, public.listing.listing_id, public.listing.description, public.listing.location, public.listing.price, public.listing.image1, public.listing.image2, public.listing.image3, public.listing.image4, public.listing.image5 FROM public.user LEFT JOIN public.listing ON public.user.user_id = public.listing.user_id WHERE public.user.user_id = $1",
      [request.user.user_id]
    );

    response.json(userListing.rows);
    // console.log(user.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/api/v1/listing", async (request, response) => {
  try {
    const listing = await pool.query(
      "Select public.listing.listing_id, public.listing.description, public.listing.location, public.listing.price, public.listing.image1, public.listing.image2, public.listing.image3, public.listing.image4, public.listing.image5 FROM public.listing ORDER BY public.listing.listing_id DESC"
    );

    response.json(listing.rows);
    // console.log(listing.rows);
  } catch (error) {
    console.log(error);
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
