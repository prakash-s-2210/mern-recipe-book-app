import mongoose from "mongoose";

// Define the schema for saved recipes
const RecipeSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    recipeId: {
      type: Array,
      default: [],
      required: true,
    },
  },
  { timestamps: true }
);

// Create a model for saved recipes using the schema
const SavedRecipes = mongoose.model("SavedRecipes", RecipeSchema);

// Export the saved recipes model for use in other modules
export default SavedRecipes;