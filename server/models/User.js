import mongoose from "mongoose";

// Define the schema for users
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    picture: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Create a model for users using the schema
const User = mongoose.model("User", UserSchema);

// Export the user model for use in other modules
export default User;