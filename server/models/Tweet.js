import mongoose from "mongoose";
// Define the structure of the Tweet document using a Schema

const TweetSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      max: 280,
    },
    likes: {
      type: Array,
      defaultValue: [], // Default value for the likes field
    },
    retweets: {
      // Add the retweets field
      type: Array,
      default: [], // Default value for the retweets field
    },
    comments: [
      // Add the comments field as an array of objects
      {
        userId: String, // ID of the user who made the comment
        text: String, // The comment text
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

export default mongoose.model("Tweet", TweetSchema);
