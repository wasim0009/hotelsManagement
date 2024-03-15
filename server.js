const express = require("express");
const app = express(); // app globally likhte hai ,  app ab Waiter ban gya hai  , usse sab le skte hai
const db = require("./db");
const bodyParser = require("body-parser");
const router = require("./routes/personRoutes");
const menurouter = require("./routes/menuRoutes");
require('dotenv').config();
const PORT= process.env.PORT || 8080;
app.use(bodyParser.json()); /// ye data ko req.body me store karega
app.get("/", (req, res) => {
  res.send("Welcome to my Hotel");
});

app.use('/person',router);
app.use('/menu',menurouter)

app.listen(PORT, () => {
  console.log("Server connected to port number is 8080");
});