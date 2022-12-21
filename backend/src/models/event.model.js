const { model, Schema } = require("mongoose");

const EventSchema = new Schema({
   title: { type: String, required: true },
   description: { type: String, required: true },
   startAt: { type: String, required: true },
   playersCount: { type: Number, required: true },
   gameType: { type: String, required: true },
   organizer: { type: Schema.Types.ObjectId, ref: "user" },
});

const EventModel = model("event", EventSchema);

module.exports = EventModel;
