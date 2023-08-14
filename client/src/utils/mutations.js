// IMPORT THE "gql" FUNCTION FROM "@apollo/client" TO DEFINE GRAPHQL QUERIES AND MUTATIONS
import { gql } from "@apollo/client";

// MUTATION TO ADD A NEW USER TO THE DATABASE
export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
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
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// MUTATION TO CREATE A NEW EVENT IN THE DATABASE
export const CREATE_EVENT = gql`
  mutation CREATE_EVENT(
    $title: String!
    $description: String!
    $cost: Int
    $location: String!
    $date: String!
  ) {
    createEvent(
      title: $title
      description: $description
      cost: $cost
      location: $location
      date: $date
    ) {
      _id
      title
      description
      cost
      location
      date
    }
  }
`;

// MUTATION TO UPDATE AN EXISTING EVENT IN THE DATABASE
export const UPDATE_EVENT = gql`
  mutation UPDATE_EVENT(
    $updateEventId: ID!
    $title: String
    $description: String
    $cost: Int
    $location: String
    $date: String
  ) {
    updateEvent(
      _id: $updateEventId
      title: $title
      description: $description
      cost: $cost
      location: $location
      date: $date
    ) {
      _id
      title
      description
      cost
      location
      date
      user {
        _id
        username
      }
    }
  }
`;

// MUTATION TO DELETE AN EVENT FROM THE DATABASE
export const DELETE_EVENT = gql`
  mutation DELETE_EVENT($deleteEventId: ID!) {
    removeEvent(_id: $deleteEventId) {
      _id
      title
      description
      cost
      location
      date
      user {
        _id
        username
      }
    }
  }
`;
