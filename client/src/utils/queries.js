import { gql } from "@apollo/client";

// Query to get all users along with their events
export const GET_ALL_USERS = gql`
  query Users {
    users {
      _id
      username
      email
      events {
        _id
        title
        cost
        description
        location
      }
    }
  }
`;

// Query to get a single user by _id along with their events
export const GET_ONE_USER = gql`
  query User($_id: ID!) {
    user(_id: $_id) {
      _id
      username
      email
      events {
        _id
        title
        description
        cost
        location
        date
      }
    }
  }
`;

// Query to get all events along with their associated users
export const GET_ALL_EVENTS = gql`
  query Events {
    events {
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

// Query to get a single event by _id along with its associated user
export const GET_ONE_EVENT = gql`
  query Query($_id: ID!) {
    event(_id: $_id) {
      _id
      title
      description
      cost
      location
      user {
        _id
        username
      }
      date
    }
  }
`;
