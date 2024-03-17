const express = require("express");
const app = express(); // app globally likhte hai ,  app ab Waiter ban gya hai  , usse sab le skte hai
const db = require("./db");
const bodyParser = require("body-parser");
const router = require("./routes/personRoutes");
const menurouter = require("./routes/menuRoutes");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
app.use(bodyParser.json()); /// ye data ko req.body me store karega
const passport = require("./auth");

//MiddleWare Function
const logginFunc = (req, res, next) => {
  console.log(
    `[ ${new Date().toLocaleString()} ] Requested made to ${req.originalUrl}`
  );
  next(); // it is very imp phase for opening website
};



app.use(passport.initialize());
app.use(logginFunc);

const localAuthentication =passport.authenticate("local", { session: false })
app.get("/"  , (req, res) => {
  res.send("Welcome to my Hotel");
});

app.use("/person",localAuthentication, router);
app.use("/menu",localAuthentication, menurouter);

app.listen(PORT, () => {
  console.log("Server connected to port number is 8080");
});
