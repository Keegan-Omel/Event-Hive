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
    createEvent: async (_, args) => {
      const event = await Event.create(args);
      return event;
    },
    removeUser: async (_, { _id }) => {
      return User.findByIdAndDelete(_id);
    },
    removeEvent: async (_, { _id }) => {
      return Event.findByIdAndDelete(_id);
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
