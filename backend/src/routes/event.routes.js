const express = require("express");
const EventModel = require("../models/event.model");

const app = express.Router();

app.get("/", async (req, res) => {
   try {
      const events = await EventModel.find().populate("organizer");
      res.send({ events });
   } catch (err) {
      res.send({ message: err });
   }
});

app.post("/post", async (req, res) => {
   const data = req.body;
   try {
      const event = new EventModel(data);
      await event.save();
      res.send({ event, message: "Event posted successfully" });
   } catch (err) {
      res.status(400).send({ message: err });
   }
});

app.get("/:id", async (req, res) => {
   const { id } = req.params;

   try {
      const event = await EventModel.findById(id).populate("organizer");
      res.send({ event });
   } catch (err) {
      res.status(400).send({ message: err });
   }
});

module.exports = app;