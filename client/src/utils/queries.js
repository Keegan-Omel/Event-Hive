import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
  query {
    users {
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

export const GET_ONE_USER = gql`
  query GetUser($_id: ID!) {
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

export const GET_ALL_EVENTS = gql`
  query {
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
        email
      }
      attendees {
        _id
        username
        email
      }
    }
  }
`;

export const GET_ONE_EVENT = gql`
  query GetEvent($_id: ID!) {
    event(_id: $_id) {
      _id
      title
      description
      cost
      location
      date
      user {
        _id
        username
        email
      }
      attendees {
        _id
        username
        email
      }
    }
  }
`;
