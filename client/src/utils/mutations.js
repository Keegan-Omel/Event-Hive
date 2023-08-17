// IMPORT THE "gql" FUNCTION FROM "@apollo/client" TO DEFINE GRAPHQL QUERIES AND MUTATIONS
import { gql } from "@apollo/client";

// MUTATION TO ADD A NEW USER TO THE DATABASE
export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// MUTATION TO PERFORM USER LOGIN AND RETURN A JWT UPON SUCCESS
export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// MUTATION TO UPDATE AN EXISTING USER IN THE DATABASE
export const UPDATE_USER = gql`
  mutation UpdateUser($_id: ID!, $username: String, $email: String) {
    updateUser(_id: $_id, username: $username, email: $email) {
      _id
      username
      email
    }
  }
`;

// MUTATION TO REMOVE A USER FROM THE DATABASE
export const DELETE_USER = gql`
  mutation DeleteUser($_id: ID!) {
    removeUser(_id: $_id) {
      _id
      username
      email
    }
  }
`;

// MUTATION TO CREATE A NEW EVENT IN THE DATABASE
export const CREATE_EVENT = gql`
  mutation CreateEvent(
    $title: String!
    $description: String!
    $date: String!
    $location: String!
    $cost: Int
    $seating: Int
  ) {
    createEvent(
      title: $title
      description: $description
      date: $date
      location: $location
      cost: $cost
      seating: $seating
    ) {
      _id
      title
      description
      date
      location
      cost
      seating
    }
  }
`;

// MUTATION TO UPDATE AN EXISTING EVENT IN THE DATABASE
export const UPDATE_EVENT = gql`
  mutation UpdateEvent(
    $_id: ID!
    $title: String
    $description: String
    $date: String
    $location: String
    $cost: Int
    $seating: Int
  ) {
    updateEvent(
      _id: $_id
      title: $title
      description: $description
      date: $date
      location: $location
      cost: $cost
      seating: $seating
    ) {
      _id
      title
      description
      date
      location
      cost
      seating
      user {
        _id
        username
      }
    }
  }
`;

// MUTATION TO DELETE AN EVENT FROM THE DATABASE
export const DELETE_EVENT = gql`
  mutation DeleteEvent($_id: ID!) {
    removeEvent(_id: $_id) {
      _id
    }
  }
`;

// Checkpoint!
