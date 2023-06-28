//const { session } = require("passport");

const session = require("express-session");
const MongoStore=require('connect-mongo')
module.exports.sessionConfig = () => {
  return session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
    store: new MongoStore({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
  });
};
