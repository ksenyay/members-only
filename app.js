const express = require("express");
require("dotenv").config();
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const router = require("./routes/index");
const passport = require("passport");

// Initiate the app
const app = express();

// Set view engine to EJS
app.set("view engine", "ejs");

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data
app.use(cookieParser(process.env.SESSION_SECRET));

// Configure session management
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false, // Don't save empty sessions
    resave: false, // Don't resave unchanged sessions
    cookie: { maxAge: 60000 * 60 }, // Session expires in 1 hour
    //store: MongoStore.create({ client: mongoose.connection.getClient() }),
  })
);

// Serve static files
app.use("/styles", express.static(path.join(__dirname, "styles")));
app.use(express.static(path.join(__dirname, "public")));

// Passport
app.use(passport.initialize()); // Initialize Passport middleware
app.use(passport.session()); // Enable persistent login sessions

// Routes
app.use(router); // Use application routes

// Starting the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("The server is running at localhost:3000");
});
