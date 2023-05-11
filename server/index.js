// Importing necessary packages and modules
import express from "express"; // web framework
import connectDB from "./mongodb/connect.js";
import bodyParser from "body-parser";// middleware for parsing request bodies
import mongoose from "mongoose"; // ODM library for MongoDB
import cors from "cors"; // middleware for enabling Cross-Origin Resource Sharing
import * as dotenv from "dotenv"; // package for managing environment variables
import multer from "multer"; // middleware for handling file uploads
import helmet from "helmet"; // middleware for securing HTTP headers
import morgan from "morgan"; // middleware for logging HTTP requests and responses
import path from "path"; // built-in Node.js module for handling file paths 
import { fileURLToPath } from "url"; // built-in Node.js module for working with file URLs
import authRoutes from "./routes/auth.js"; // authentication routes
import userRoutes from "./routes/users.js"; // user routes
import { register } from "./controllers/auth.js"; // authentication controller functions
import User from "./models/User.js"; // user model
import SavedRecipes from "./models/SavedRecipes.js"; // saved recipes model
import { users,  savedRecipes} from "./data/index.js"; // sample data

//CONFIGURATIONS AND SETUP
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config(); // load environment variables from .env file
const app = express(); // create express app
app.use(express.json()); // middleware for parsing JSON request bodies
app.use(helmet()); // middleware for setting various security-related HTTP headers
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // middleware for enabling CORS with cross-origin policy
app.use(morgan("common")); // middleware for logging HTTP requests and responses
app.use(bodyParser.json({ limit: "30mb", extended: true })); // middleware for parsing JSON request bodies with specified size limit and extended mode
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); // middleware for parsing URL-encoded request bodies with specified size limit and extended mode
app.use(cors()); // middleware for enabling CORS with default options
app.use("/assets", express.static(path.join(__dirname, "public/assets"))); // serve static files from public/assets directory


/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets"); // specify upload destination directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // specify uploaded file name
  },
});
const upload = multer({ storage }); // create middleware for handling file uploads


/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register); // register endpoint with file upload middleware
app.get("/", (req, res) => {
  res.send({ message: "Hello World!" }); // root endpoint
});

/* ROUTES */
app.use("/auth", authRoutes); // use authentication routes
app.use("/users", userRoutes); // use user routes
 
//MONGOOSE SETUP
const PORT = process.env.PORT || 6001; // set server port

const startServer = async () => {
  try {
      connectDB(process.env.MONGO_URL, () => {
      console.log("MongoDB connected, starting server...");
      app.listen(PORT, () => console.log("Server started on port http://localhost:8080")
      );
    });
  } catch (error) {
      console.log(error);
  }
};
startServer();






