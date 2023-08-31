import User from "../models/User.js"; // Import the User model
import bcrypt from "bcryptjs"; // Import bcrypt for password hashing
import jwt from "jsonwebtoken"; // Import jwt for token generation
import { handleError } from "../error.js"; // Import the handleError function
// Controller function for user signup

export const signup = async (req, res, next) => {
  console.log(req.body);

  try {
    const salt = bcrypt.genSaltSync(10); // Generate a salt for bcrypt hashing
    const hash = bcrypt.hashSync(req.body.password, salt); // Hash the user's password
    const newUser = new User({ ...req.body, password: hash }); // Create a new user with hashed password

    await newUser.save(); // Save the new user to the database

    const token = jwt.sign({ id: newUser.id }, process.env.JWT); // Create a JWT token

    const { password, ...othersData } = newUser._doc; // Exclude password from response

    // Set the JWT token in a cookie and send user data in response
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(othersData);
  } catch (err) {
    next(err); // Pass any errors to the error-handling middleware
  }
};

// Controller function for user signin
export const signin = async (req, res, next) => {
  console.log(req.body);

  try {
    const user = await User.findOne({ username: req.body.username }); // Find user by username

    if (!user) return next(handleError(404, "User not found")); // Return 404 if user not found

    const isCorrect = await bcrypt.compare(req.body.password, user.password); // Compare passwords

    if (!isCorrect) return next(handleError(400, "Wrong password")); // Return 400 if wrong password

    const token = jwt.sign({ id: user._id }, process.env.JWT); // Create a JWT token

    const { password, ...othersData } = user._doc; // Exclude password from response

    // Set the JWT token in a cookie and send user data in response
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(othersData);
  } catch (err) {
    next(err); // Pass any errors to the error-handling middleware
  }
};
