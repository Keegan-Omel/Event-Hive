// IMPORT GQL FUNCTION FROM THE APOLLO CLIENT TO DEFINE GRAPHQL QUERIES

// GRAPHQL QUERY TO GET ALL USERS ALONG WITH THEIR EVENTS
export const GET_ALL_USERS = gql`
  query Users {
    users {
      id
      username
      email
      events {
        id
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
    user(id: $userId) {
      id
      username
      email
      events {
        id
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

// GRAPHQL QUERY TO GET A SINGLE EVENT BY EVENTID ALONG WITH ITS ASSOCIATED USER
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
