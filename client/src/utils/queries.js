import { gql } from '@apollo/client';

export const GET_ALL_USER = gql`
query Users {
  users {
    id
    username
    email
    events {
      id
      title
      description
    }
  }
}
`;

export const GET_ONE_USER = gql`
query Users {
  users {
    id
    username
    email
    events {
      id
      title
      description
    }
  }
}
`;

export const GET_ALL_EVENTS = gql`
  query Events {
    events {
      id
      title
      description
      cost
      location
      date
      user {
        id
        username
      }
    }
  }
`;

export const GET_ONE_EVENT = gql`
  query Query($eventId: ID!) {
    event(id: $eventId) {
      id
      title
      description
      cost
      location
      user {
        id
        username
      }
      date
    }
  }
`;
