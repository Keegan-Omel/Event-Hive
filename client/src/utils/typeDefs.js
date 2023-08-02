import { gql } from '@apollo/client';

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

    createUser(username: String!, email: String!, password: String!): User
    
    updateUser(
      _id: ID!
      username: String
      email: String
      password: String
    ): User

    removeUser(_id: ID!): User

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

export default typeDefs;

// checkpoint!!
