const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    events: [Event]
  }

  type Event {
    _id: ID!
    title: String!
    description: String!
    user: User
    date: String!
    cost: Int
    seating: Int
    location: String!
    attendees: [User]
    seatingFull: Boolean
  }

  type Query {
    users: [User]
    user(_id: ID!): User
    events: [Event]
    event(_id: ID!): Event
  }

  type Mutation {
    # Create a new user
    createUser(username: String!, email: String!, password: String!): User

    # Update an existing user by ID
    updateUser(
      _id: ID!
      username: String
      email: String
      password: String
    ): User

    # Remove a user by ID
    removeUser(_id: ID!): User

    # Create a new event
    createEvent(
      title: String!
      description: String!
      date: String!
      location: String!
      cost: Int
      seating: Int
    ): Event

    # Update an existing event by ID
    updateEvent(
      _id: ID!
      title: String
      description: String
      date: String
      location: String
      cost: Int
      seating: Int
    ): Event

    # Remove an event by ID
    removeEvent(_id: ID!): Event
  }
`;

module.exports = typeDefs;
