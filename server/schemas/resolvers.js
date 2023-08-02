const { User, Event } = require("../models");

const resolvers = {
  Query: {
    users: async () => {
      return User.find({});
    },
    user: async (parent, { _id }) => {
      return User.findById(_id);
    },
    events: async () => {
      return Event.find({});
    },
    event: async (parent, { _id }) => {
      return Event.findById(_id);
    },
  },
  Mutation: {
    createUser: async (_, args) => {
      const user = await User.create(args);
      return user;
    },
    updateUser: async (_, { _id, username, email, password }) => {
      const updatedUser = await User.findByIdAndUpdate(
        _id,
        { username, email, password },
        { new: true }
      );
      return updatedUser;
    },
    removeUser: async (_, { _id }) => {
      const removedUser = await User.findByIdAndDelete(_id);
      return removedUser;
    },
    createEvent: async (_, args) => {
      const event = await Event.create(args);
      return event;
    },
    updateEvent: async (_, { _id, title, description, date, location, cost, seating }) => {
      const updatedEvent = await Event.findByIdAndUpdate(
        _id,
        { title, description, date, location, cost, seating },
        { new: true }
      );
      return updatedEvent;
    },
    removeEvent: async (_, { _id }) => {
      const removedEvent = await Event.findByIdAndDelete(_id);
      return removedEvent;
    },
  },
  User: {
    events: async (parent) => {
      const events = await Event.find({ _id: { $in: parent.events } });
      return events;
    },
  },
  Event: {
    user: async (parent) => {
      return User.findById(parent.user);
    },
    seatingFull: async (parent) => {
      return parent.attendees.length >= parent.seating;
    },
  },
};

module.exports = resolvers;
