const { Schema, model, mongoose } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: "You need to leave an event description!",
      minlength: 1,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    date: {
      type: Date,
      required: true,
      // get: (timestamp) => dateFormat(timestamp),
    },
    cost: {
      type: Number,
    },
    seating: {
      type: Number,  
    },
    location: {
      type: String,
      required: true,
    },
    attendees: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }],

  },
  { timestamps: true },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Event = mongoose.model("Event", eventSchema);

Event.schema.path("date").validate(function (value) {
  const currentDate = new Date();
  return value > currentDate;
}, "The date for an event must be in the future.");


eventSchema.virtual("seatingFull").get(function () {
  return this.attendees.length >= this.seating;
});


module.exports = Event;
