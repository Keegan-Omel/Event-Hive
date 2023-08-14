// Purpose: to define the query and mutation functionality to work with the Mongoose models.
const { AuthenticationError } = require("apollo-server-express");
const { User, Event } = require("../models");
const { generateToken } = require("../utils/auth");
const { authMiddleware } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      try {
        return await User.find({});
      } catch (error) {
        throw new Error("Failed to fetch users");
      }
    },
    user: async (parent, { _id }) => {
      try {
        return await User.findById(_id);
      } catch (error) {
        throw new Error("User not found");
      }
    },
    events: async () => {
      try {
        return await Event.find({});
      } catch (error) {
        throw new Error("Failed to fetch events");
      }
    },
    event: async (parent, { _id }) => {
      try {
        return await Event.findById(_id);
      } catch (error) {
        throw new Error("Event not found");
      }
    },
  },
  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = generateToken(user);

      return { token, user };
    },
    loginUser: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.checkPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = generateToken(user);

      return { token, user };
    },
    updateUser: async (_, { _id, username, email }, context) => {
      try {
        // Apply authentication middleware
        authMiddleware(context);

        // If the user is not authenticated, throw an AuthenticationError
        if (!context.user) {
          throw new AuthenticationError("User not authenticated");
        }

        // Update the user (if authenticated)
        const updatedUser = await User.findByIdAndUpdate(
          _id,
          { username, email },
          { new: true }
        );

        return updatedUser;
      } catch (error) {
        throw new Error("Failed to update user");
      }
    },

    removeUser: async (_, { _id }, context) => {
      try {
        // Apply authentication middleware
        authMiddleware(context);

        // If the user is not authenticated, throw an AuthenticationError
        if (!context.user) {
          throw new AuthenticationError("User not authenticated");
        }

        // Remove the user (if authenticated)
        const removedUser = await User.findByIdAndDelete(_id);
        return removedUser;
      } catch (error) {
        throw new Error("Failed to remove user");
      }
    },
    createEvent: async (_, args, context) => {
      try {
        // Apply authentication middleware
        authMiddleware(context);

        // If the user is not authenticated, throw an AuthenticationError
        if (!context.user) {
          throw new AuthenticationError("User not authenticated");
        }

        // Create the event (if authenticated)
        const event = await Event.create(args);
        return event;
      } catch (error) {
        throw new Error("Failed to create event");
      }
    },
    updateEvent: async (
      _,
      { _id, title, description, date, location, cost, seating },
      context
    ) => {
      try {
        // Apply authentication middleware
        authMiddleware(context);

        // If the user is not authenticated, throw an AuthenticationError
        if (!context.user) {
          throw new AuthenticationError("User not authenticated");
        }

        // Update the event (if authenticated)
        const updatedEvent = await Event.findByIdAndUpdate(
          _id,
          { title, description, date, location, cost, seating },
          { new: true }
        );
        return updatedEvent;
      } catch (error) {
        throw new Error("Failed to update event");
      }
    },
    removeEvent: async (_, { _id }, context) => {
      try {
        // Apply authentication middleware
        authMiddleware(context);

        // If the user is not authenticated, throw an AuthenticationError
        if (!context.user) {
          throw new AuthenticationError("User not authenticated");
        }

        // Remove the event (if authenticated)
        const removedEvent = await Event.findByIdAndDelete(_id);
        return removedEvent;
      } catch (error) {
        throw new Error("Failed to remove event");
      }
    },
  },
  User: {
    events: async (parent) => {
      try {
        const events = await Event.find({ _id: { $in: parent.events } });
        return events;
      } catch (error) {
        throw new Error("Failed to fetch events for user");
      }
    },
  },
  Event: {
    user: async (parent) => {
      try {
        return await User.findById(parent.user);
      } catch (error) {
        throw new Error("Failed to fetch user for event");
      }
    },
    seatingFull: (parent) => {
      return parent.attendees.length >= parent.seating;
    },
  },
};

module.exports = resolvers;

// CheckPoint!!
