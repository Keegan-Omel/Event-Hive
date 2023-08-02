// IMPORT MONGOOSE PACKAGE FOR WORKING WITH MONGODB DATABASE
const mongoose = require("mongoose");

// DEFINE THE SCHEMA FOR THE EVENT MODEL
const eventSchema = new mongoose.Schema({
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
    ref: "User", // REFERENCING THE "User" MODEL
  },
  // ATTENDEES FOR THE EVENT (AN ARRAY OF USER OBJECT IDS)
  attendees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // REFERENCING THE "User" MODEL
  }],
  // DATE OF THE EVENT
  date: {
    type: Date,
    required: true, // DATE IS REQUIRED
  },
}, { timestamps: true });

// CREATE THE "Event" MODEL USING THE SCHEMA
const Event = mongoose.model("Event", eventSchema);

// DEFINE VALIDATORS FOR THE SCHEMA
// VALIDATE THE NUMBER OF ATTENDEES FOR AN EVENT NOT EXCEEDS 50
Event.schema.path('attendees').validate(function (value) {
  return value.length <= 50; // SET THE MAXIMUM NUMBER OF ATTENDEES FOR AN EVENT TO 50
}, 'The number of attendees for an event cannot exceed 50.');

// VALIDATE THAT THE DATE FOR AN EVENT IS IN THE FUTURE
Event.schema.path('date').validate(function (value) {
  const currentDate = new Date();
  return value > currentDate; // SET THE DATE FOR AN EVENT TO BE IN THE FUTURE
}, 'The date for an event must be in the future.');

// EXPORT THE "Event" MODEL
module.exports = Event;
