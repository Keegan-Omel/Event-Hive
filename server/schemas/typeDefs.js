const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    events: [Event] # List of events associated with this user
  }

  type Event {
    _id: ID!
    title: String!
    description: String!
    user: User # The user who created the event
    date: String!
    cost: Int
    seating: Int
    location: String!
    attendees: [User] # List of users attending the event
    seatingFull: Boolean # Indicates if event seating is full
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User] # Get a list of all users
    user(_id: ID!): User # Get a user by their ID
    events: [Event] # Get a list of all events
    event(_id: ID!): Event # Get an event by its ID
  }

  type Mutation {
    # User-related mutations
    createUser(username: String!, email: String!, password: String!): Auth
    loginUser(email: String!, password: String!): Auth
    updateUser(
      _id: ID!
      username: String
      email: String
      password: String
    ): User
    removeUser(_id: ID!): User

    # Event-related mutations
    createEvent(
      title: String!
      description: String!
      date: String!
      location: String!
      cost: Int
      seating: Int
    ): Event
    updateEvent(
      _id: ID!
      title: String
      description: String
      date: String
      location: String
      cost: Int
      seating: Int
    ): Event
    removeEvent(_id: ID!): Event
  }
`;

module.exports = typeDefs;
