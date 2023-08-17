// IMPORT MONGOOSE PACKAGE FOR WORKING WITH MONGODB DATABASE
const mongoose = require("mongoose");

// DEFINE THE SCHEMA FOR THE EVENT MODEL
const eventSchema = new mongoose.Schema(
  {
    // TITLE OF THE EVENT
    title: {
      type: String,
      required: true, // TITLE IS REQUIRED
    },
    // DESCRIPTION OF THE EVENT
    description: {
      type: String,
      required: true, // DESCRIPTION IS REQUIRED
      minlength: 1, // DESCRIPTION SHOULD HAVE AT LEAST 1 CHARACTER
    },
    // COST OF THE EVENT (OPTIONAL)
    cost: {
      type: Number,
    },
    // LOCATION OF THE EVENT
    location: {
      type: String,
      required: true, // LOCATION IS REQUIRED
    },
    // USER ASSOCIATED WITH THE EVENT
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // REFERENCING THE "User" MODEL for the creator of the event
    },
    // ATTENDEES FOR THE EVENT (AN ARRAY OF USER OBJECT IDS)
    attendees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // REFERENCING THE "User" MODEL for attendees
      },
    ],
    // DATE OF THE EVENT
    date: {
      type: Date,
      required: true, // DATE IS REQUIRED
    },
    // SEATING CAPACITY FOR THE EVENT
    seating: {
      type: Number,
      required: true, // SEATING CAPACITY IS REQUIRED
      min: 1, // MINIMUM SEATING CAPACITY IS 1
    },
  },
  { timestamps: true }
);

// CREATE THE "Event" MODEL USING THE SCHEMA
const Event = mongoose.model("Event", eventSchema);

// DEFINE VALIDATORS FOR THE SCHEMA
// VALIDATE THE NUMBER OF ATTENDEES FOR AN EVENT NOT EXCEEDS THE SEATING CAPACITY
eventSchema.path("attendees").validate(function (value) {
  return value.length <= this.seating; // SET THE MAXIMUM NUMBER OF ATTENDEES FOR AN EVENT BASED ON SEATING CAPACITY
}, "The number of attendees for an event cannot exceed the seating capacity.");

// VALIDATE THAT THE DATE FOR AN EVENT IS IN THE FUTURE
eventSchema.path("date").validate(function (value) {
  const currentDate = new Date();
  return value > currentDate; // SET THE DATE FOR AN EVENT TO BE IN THE FUTURE
}, "The date for an event must be in the future.");

// EXPORT THE "Event" MODEL
module.exports = Event;
