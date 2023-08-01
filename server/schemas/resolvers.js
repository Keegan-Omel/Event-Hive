const { User, Event } = require('../models');

const resolvers = {
  Query: {
    user: async () => {
      return User.find({});
    },
    event: async () => {
      return Event.find({});
    },
    users: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return User.find(params);
    },
    events: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return Event.find(params);
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);
      return user;
    },
    createEvent: async (parent, args) => {
      const event = await Event.create(args);
      return event;
    },
    removeUser: async (parent, { userId }) => {
      return User.findOneAndDelete({ _id: userId });
    },
    removeEvent: async (parent, { eventId }) => {
      return Event.findOneAndDelete({ _id: eventId });
    },
    
    //ADD UPDATE USER,EVENT,

    // create: async (parent, { _id, techNum }) => {
    //   const vote = await Matchup.findOneAndUpdate(
    //     { _id },
    //     { $inc: { [`tech${techNum}_votes`]: 1 } },
    //     { new: true }
    //   );
    //   return vote;
    // },
  },
};

module.exports = resolvers;
