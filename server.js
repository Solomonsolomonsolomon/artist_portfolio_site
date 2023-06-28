require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 9999;
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");
const mongoStore = require("connect-mongo");
const MongoStore = require("connect-mongo");
const { sessionConfig } = require("./middleware/sessions.middleware");
const passport = require("passport");
const path = require("path");
const { User } = require("./model/database");
const { protectedRoute } = require("./middleware/protectedroutes");
const authRoute = require("./route/auth.route");
const homeRoute = require("./route/home.route");
//#DataBase
require("./model/database");
//#setting middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "client", "home")));
app.use(express.static(path.join(__dirname, "client")));

require("./middleware/passport.middleware");
app.use(sessionConfig());
//initiaizing passport
app.use(passport.initialize());
app.use(passport.session()); 
passport.serializeUser(function (user, done) {
  done(null, user._id);
});
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

//#ROUTES
app.use("/auth", authRoute);
app.get("/", homeRoute);
//listener function
app.listen(port, (err) => {
  if (err) {
    console.error(err);
  }
  console.log(`server started port ${port}`);
  console.log(`last refresh ${new Date()}`);
});
