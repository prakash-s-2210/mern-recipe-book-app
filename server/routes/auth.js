// Import required modules and functions
import express from "express";
import { login } from "../controllers/auth.js";

// Create a new router instance
const router = express.Router();

/* POST user login */
router.post("/login", login);

// Export the router for use in other modules
export default router;