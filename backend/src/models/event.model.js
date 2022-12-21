const { model, Schema } = require("mongoose");

const EventSchema = new Schema({
   title: { type: String, required: true },
   description: { type: String, required: true },
   startAt: { type: String, required: true },
   playerLimit: { type: Number, required: true },
   gameType: { type: String, required: true },
   organizer: { type: Schema.Types.ObjectId, ref: "user" },
   pending: [{ type: Schema.Types.ObjectId, ref: "user" }],
   accepted: [{ type: Schema.Types.ObjectId, ref: "user" }],
});

const EventModel = model("event", EventSchema);

module.exports = EventModel;
