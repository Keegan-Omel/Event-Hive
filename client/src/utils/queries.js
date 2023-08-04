// IMPORT GQL FUNCTION FROM THE APOLLO CLIENT TO DEFINE GRAPHQL QUERIES
import { gql } from '@apollo/client';

// GRAPHQL QUERY TO GET ALL USERS ALONG WITH THEIR EVENTS
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

// GRAPHQL QUERY TO GET A SINGLE USER BY USERID ALONG WITH THEIR EVENTS
export const GET_ONE_USER = gql`
  query User($userId: ID!) {
    user(userId: $userId) {
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

// GRAPHQL QUERY TO GET ALL EVENTS ALONG WITH THEIR ASSOCIATED USERS
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

// GRAPHQL QUERY TO GET A SINGLE EVENT BY EVENTID ALONG WITH ITS ASSOCIATED USER
export const GET_ONE_EVENT = gql`
  query Query($eventId: ID!) {
    event(eventId: $eventId) {
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
