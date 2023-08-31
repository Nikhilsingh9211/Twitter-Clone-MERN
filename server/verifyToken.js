import jwt from "jsonwebtoken";
import { handleError } from "./error.js"; // Import the handleError function
// Middleware to verify JWT token

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token; // Extract the token from the "access_token" cookie

  if (!token) return next(handleError(401, "You are not authenticated"));

  // Verify the token using the secret from process.env.JWT
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(handleError(403, "Invalid Token")); // If verification fails, return a 403 error
    req.user = user; // If verification succeeds, attach the user object to the request
    next(); // Proceed to the next middleware or route handler
  });
};
