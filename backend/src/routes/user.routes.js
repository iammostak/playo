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
         res.status(400).send({
            user,
            message: "User already exists, try to login",
         });
      } else if (user && username === user.username && email !== user.email) {
         res.status(400).send({
            user,
            message: "Username already in use",
         });
      } else if (user && username !== user.username && email === user.email) {
         res.status(400).send({
            user,
            message: "Email has already been used",
         });
      } else {
         user = new UserModel({ username, email, password });
         await user.save();
         res.send({ user, message: "Account created successfully!" });
      }
   } catch (err) {
      res.status(400).send({message: "Registration failed, please try again"});
   }
});

app.post("/login", async (req, res) => {
   const { username, password } = req.body;

   const user = await UserModel.findOne({ username, password });

   try {
      if (!user) {
         res.status(400).send({message: "Invalid Credential!"});
      } else {
         const token = jwt.sign(
            { username: user.username, email: user.email },
            secretKey,
            { expiresIn: "7 days" }
         );

         res.send({
            user,
            token,
            message: "User logged in successfully",
         });
      }
   } catch (err) {
      res.status(400).send("Login failed, please try again");
   }
});

module.exports = app;
