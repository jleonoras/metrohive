import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateJwt = (email) => {
  return jwt.sign(email, process.env.jwtSecret, { expiresIn: "1h" });
};

export { generateJwt };
