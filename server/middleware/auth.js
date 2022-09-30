import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const auth = (request, response, next) => {
  //this will check if a token is existing in the Authorization Header
  const token = request.header("Authorization");
  if (!token) {
    return response.status(403).json({ error: "Invalid token" });
  }
  try {
    //this will take the token from the Authorization header then will use
    //jwt.verify function to process it
    jwt.verify(token.slice(7), process.env.jwtSecret, (error, user) => {
      if (error) return response.sendStatus(403);
      request.user = user;
      next();
    });
  } catch (error) {
    response.status(401).json({ error: error.message });
  }
};

export { auth };
