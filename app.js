const express = require("express");
require("dotenv").config();
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const router = require("./routes/index");
const passport = require("passport");
require("./strategies/local-strategy");

// Data
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");

// Initiate the app
const app = express();

// Connect to MongoDB database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err));

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data
app.use(cookieParser(process.env.SESSION_SECRET));

// Serve static files
app.use("/styles", express.static(path.join(__dirname, "styles")));
app.use(express.static(path.join(__dirname, "public")));

// Configure session management
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false, // Don't save empty sessions
    resave: false, // Don't resave unchanged sessions
    cookie: { maxAge: 60000 * 60 }, // Session expires in 1 hour
    store: MongoStore.create({ client: mongoose.connection.getClient() }),
  })
);

// Passport
app.use(passport.initialize()); // Initialize Passport middleware
app.use(passport.session()); // Enable persistent login sessions

// Current user becomes available across the app

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// Routes
app.use(router); // Use application routes

// Set view engine to EJS
app.set("view engine", "ejs");

// Starting the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("The server is running at localhost:3000");
});
