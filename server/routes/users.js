// Import required modules and functions
import express from "express";
import {
  getSavedRecipe,
  updateSavedRecipe
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

// Create a new router instance
const router = express.Router();

/* READ */
/* GET saved recipe by user ID */
router.get("/:userId/savedRecipe", verifyToken, getSavedRecipe);


/* UPDATE */
/* UPDATE saved recipe by user ID */
router.put("/:userId/savedRecipe", verifyToken, updateSavedRecipe);

// Export the router for use in other modules
export default router;