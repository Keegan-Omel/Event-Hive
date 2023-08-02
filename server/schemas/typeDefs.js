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

    users {
      _id
      username
      email
      events {
        _id
        title
        description
        cost
        date
        location
        seatingFull
        attendees {
          _id
          username
        }
      }
    }

    user(_id: $id) {
      _id
      username
      email
      events {
        _id
        title
      }
    }

    events {
      _id
      title
      description
      cost
      date
      location
      seatingFull
      user {
        _id
        username
      }
      attendees {
        _id
        username
      }
    }

    event(_id: $id) {
      _id
      title
      description
      cost
      date
      location
      seatingFull
      user {
        _id
        username
      }
      attendees {
        _id
        username
      }
    }

  }

  type Mutation {

    createUser(username: $username, email: $email, password: $password) {
      _id
      username
      email
      events {
        _id
        title
      }
      
    }

    createEvent(title: $title, description: $description, date: $date, location: $location, cost: $cost, seating: $seating) {
      _id
      title
      description
      cost
      date
      location
      seatingFull
      user {
        _id
        username
      }
      attendees {
        _id
        username
      }
    }

  }
`;

module.exports = typeDefs;

//checkPoint!!!!!NEW!!!!
