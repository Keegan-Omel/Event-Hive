import { gql } from '@apollo/client';


// This should be good, need to fix the others
export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      username
      email
      password
    }
  }  
  `;

// the others begin here
export const UPDATE_USER = gpl`  
  updateUser(
    _id: ID!
    username: String
    email: String
    password: String
  ): User
  }`;

export const REMOVE_USER = gpl`

  removeUser(_id: ID!): User
  }`;

// this is no longer an other
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

export const UPDATE_EVENT = gpl`
  updateEvent(
    _id: ID!
    title: String
    description: String
    date: String
    location: String
    cost: Int
    seating: Int
  ): Event
  }`;

export const REMOVE_EVENT = gpl`

  removeEvent(_id: ID!): Event
}`;