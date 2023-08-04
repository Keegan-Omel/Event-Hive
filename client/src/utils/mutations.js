// IMPORT THE "gql" FUNCTION FROM "@apollo/client" TO DEFINE GRAPHQL QUERIES AND MUTATIONS

// MUTATION TO ADD A NEW USER TO THE DATABASE
export const ADD_USER = gql`
  mutation ADD_USER($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token // RETURNS A JSON WEB TOKEN (JWT) AFTER USER CREATION
      user {
        id
        username
        email
      }
    }
  }
`;

// MUTATION TO PERFORM USER LOGIN AND RETURN A JWT UPON SUCCESS
export const LOGIN_USER = gql`
  mutation LOGIN_USER($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token // RETURNS A JSON WEB TOKEN (JWT) UPON SUCCESSFUL LOGIN
      user {
        id
        username
        email
      }
    }
  }
`;

// MUTATION TO CREATE A NEW EVENT IN THE DATABASE
export const CREATE_EVENT = gql`
mutation CREATE_EVENT($title: String!, $description: String!, $cost: Float!, $location: String!, $userId: ID!, $date: String!) {
  createEvent(title: $title, description: $description, cost: $cost, location: $location, user: $userId, date: $date) {
    id
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
mutation UPDATE_EVENT($updateEventId: ID!, $title: String, $description: String, $cost: Float, $location: String, $date: String) {
  updateEvent(id: $updateEventId, title: $title, description: $description, cost: $cost, location: $location, date: $date) {
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

// MUTATION TO DELETE AN EVENT FROM THE DATABASE
export const DELETE_EVENT = gql`
  mutation DELETE_EVENT($deleteEventId: ID!) {
    deleteEvent(id: $deleteEventId)
  }
`;