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
    users: [User]!
    user(id: ID!): User
    events: [Event]!
    event(id: ID!): Event
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User # Add the argument definition for createUser mutation

    createEvent(title: String!, description: String!, date: String!, location: String!, cost: Int!, seating: Int): Event # Add the argument definition for createEvent mutation
  }
`;

module.exports = typeDefs;
