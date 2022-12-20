const express = require("express");
const cors = require("cors");
const Connect = require("./config/db");

require("dotenv").config("cors");
const port = process.env.PORT || 8080;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("Welcome to playo server!"));

Connect().then(() => {
   app.listen(port, () => {
      console.log(`Server started on port ${port}`);
   });
});
