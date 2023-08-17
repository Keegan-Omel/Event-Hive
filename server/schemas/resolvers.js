const { AuthenticationError } = require("apollo-server-express");
const { User, Event } = require("../models");
const { generateToken } = require("../utils/auth");
const { authMiddleware } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      try {
        const users = await User.find({}).populate("events");
        console.log("Populated users' events:", users);
        return users;
      } catch (error) {
        throw new Error("Failed to fetch users");
      }
    },
    user: async (parent, { _id }) => {
      try {
        const user = await User.findById(_id).populate("events");
        console.log("Populated users' events:", user);
        return user;
      } catch (error) {
        throw new Error("User not found");
      }
    },
    events: async () => {
      try {
        return await Event.find({}).populate("user").populate("attendees");
      } catch (error) {
        throw new Error("Failed to fetch events");
      }
    },
    event: async (parent, { _id }) => {
      try {
        return await Event.findById(_id).populate("user").populate("attendees");
      } catch (error) {
        throw new Error("Event not found");
      }
    },
  },
  // me: async (parent, args, context) => {
  //   if (context.user) {
  //     return User.findOne({ _id: context.user._id }).populate('events');
  //   }
  //   throw new AuthenticationError('You need to be logged in!');
  // },
  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      try {
        const user = await User.create({ username, email, password });
        const token = generateToken(user);
        return { token, user };
      } catch (error) {
        throw new Error("Failed to create user");
      }
    },
    loginUser: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          throw new AuthenticationError(
            "No user found with this email address"
          );
        }

        const correctPw = await user.checkPassword(password);

        if (!correctPw) {
          throw new AuthenticationError("Incorrect credentials");
        }

        const token = generateToken(user);

        return { token, user };
      } catch (error) {
        throw new Error("Failed to login");
      }
    },
    updateUser: async (_, { _id, username, email }, context) => {
      try {
        authMiddleware(context);

        if (!context.user) {
          throw new AuthenticationError("User not authenticated");
        }

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
        authMiddleware(context);

        if (!context.user) {
          throw new AuthenticationError("User not authenticated");
        }

        const removedUser = await User.findByIdAndDelete(_id);
        return removedUser;
      } catch (error) {
        throw new Error("Failed to remove user");
      }
    },
    createEvent: async (
      _,
      { title, description, date, location, cost, seating },
      context
    ) => {
      try {
        if (!context.req.user) {
          console.error("User not authenticated");
          throw new AuthenticationError("You need to be logged in!");
        }

        const { _id } = context.req.user;
        console.log("Creating event for user:", _id);

        const event = await Event.create({
          title,
          description,
          date,
          location,
          cost,
          seating, 
          user: _id,
        });
        
        // SAVES CREATED EVENT TO USER  
        await User.findByIdAndUpdate(_id, {$addToSet: {events: event._id}})

        console.log("Event created:", event);

        return event;
      } catch (error) {
        console.error("Error creating event:", error);
        throw new Error("Failed to create event");
      }
    },

    updateEvent: async (
      _,
      { _id, title, description, date, location, cost, seating }, 
      context
    ) => {
      try {
        authMiddleware(context);

        if (!context.user) {
          throw new AuthenticationError("User not authenticated");
        }

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
        //authMiddleware(context);

        if (!context.req.user) {
          throw new AuthenticationError("User not authenticated");
        }

        const removedEvent = await Event.findByIdAndDelete(_id);

        // SAVES REMOVED EVENT TO USER  
        await User.findByIdAndUpdate(context.req.user._id, {$pull: {events: _id}})
        return removedEvent;
      } catch (error) {
        console.log(error)
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

// CheckPoint!!!
