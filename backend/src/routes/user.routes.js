const express = require("express");
const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const app = express.Router();
const secretKey = process.env.SECRET_KEY;

app.post("/register", async (req, res) => {
   const { username, email, password } = req.body;

   let user = await UserModel.findOne({
      $or: [{ username: username }, { email: email }],
   });

   try {
      if (user && username === user.username && email === user.email) {
         return res.status(400).send({
            user,
            message: "user already exists, try to login",
         });
      } else if (user && username === user.username && email !== user.email) {
         return res.status(400).send({
            user,
            message: "username already in use",
         });
      } else if (user && username !== user.username && email === user.email) {
         return res.status(400).send({
            user,
            message: "email has already been used",
         });
      } else {
         user = new UserModel({ username, email, password });
         await user.save();
         res.send({ user, message: "account created successfully" });
      }
   } catch (err) {
      return res.status(400).send("registration failed, please try again");
   }
});

module.exports = app;
