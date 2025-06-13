const express = require("express");
require("dotenv").config();
const data = require("./utils/data");
const path = require("path");

// Initiate the app
const app = express();

// Set view engine to EJS
app.set("view engine", "ejs");

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data

// Serve static files
app.use("/styles", express.static(path.join(__dirname, "styles")));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", (req, res) => {
  res.render("index", { postData: data, subscribed: true });
});

// Starting the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("The server is running at localhost:3000");
});
