import mongoose from "mongoose";
// Define the structure of the User document using a Schema

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: "string",
      required: true,
    },
    username: {
      type: "string",
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    followers: {
      type: Array,
      defaultValue: [], // Default value for the followers field
    },
    following: {
      type: Array,
      defaultValue: [], // Default value for the following field
    },
    description: {
      type: String, // User's description
    },
    profilePicture: {
      type: String, // URL of the user's profile picture
    },
    location: {
      type: String, // User's location
    },
    birthdate: {
      type: Date, // User's birthdate
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
  }
);
// Create a User model based on the defined schema
export default mongoose.model("User", UserSchema);
