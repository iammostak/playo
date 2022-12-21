const express = require("express");
const EventModel = require("../models/event.model");

const app = express.Router();

app.get("/", async (req, res) => {
   const { filter } = req.query;
   try {
      if (!filter) {
         const events = await EventModel.find()
            .populate("organizer")
            .populate("accepted")
            .populate("pending");
         res.send({ events });
      } else {
         let query = filter.toLowerCase().split("");
         query[0] = query[0].toUpperCase();
         query = query.join("");

         const events = await EventModel.find({ gameType: query })
            .populate("organizer")
            .populate("accepted")
            .populate("pending");
         res.send({ events });
      }
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
      const event = await EventModel.findById(id)
         .populate("organizer")
         .populate("accepted")
         .populate("pending");
      res.send({ event });
   } catch (err) {
      res.status(400).send({ message: err });
   }
});

app.post("/join", async (req, res) => {
   const { eventId, userId } = req.body;
   try {
      let event = await EventModel.findOne({
         _id: eventId,
         pending: { $all: [userId] },
      });

      if (!event) {
         event = await EventModel.updateOne(
            { _id: eventId },
            { $push: { pending: userId } }
         );
      }

      const events = await EventModel.find()
         .populate("organizer")
         .populate("accepted")
         .populate("pending");
      res.send({ events });
   } catch (err) {
      res.status(400).send({ message: err });
   }
});

app.post("/accept", async (req, res) => {
   const { eventId, userId } = req.body;
   try {
      let event = await EventModel.findOne({
         _id: eventId,
         pending: { $all: [userId] },
      });

      if (event) {
         event = await EventModel.updateOne(
            { _id: eventId },
            { $pull: { pending: { $all: [userId] } } }
         );

         event = await EventModel.updateOne(
            { _id: eventId },
            { $push: { accepted: userId } }
         );
      }

      const events = await EventModel.find()
         .populate("organizer")
         .populate("accepted")
         .populate("pending");
      res.send({ events });
   } catch (err) {
      res.status(400).send({ message: err });
   }
});

module.exports = app;
