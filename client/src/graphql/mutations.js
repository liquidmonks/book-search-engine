// Import gql from Apollo Client for creating GraphQL queries and mutations
import { gql } from "@apollo/client";

// Define the LOGIN_USER mutation for authenticating a user
export const LOGIN_USER = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        username
        email
      }
    }
  }
`;

// Define the ADD_USER mutation for registering a new user
export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        username
        email
      }
    }
  }
`;

// Define the SAVE_BOOK mutation for saving a book to the user's saved books
export const SAVE_BOOK = gql`
  mutation SaveBook($authors: [String]!, $title: String!, $description: String!, $image: String!, $link: String, $bookId: String) {
    saveBook(authors: $authors, title: $title, description: $description, image: $image, link: $link, bookId: $bookId) {
      _id
      username
      email
      password
      bookCount
      savedBooks {
        bookId
        authors
        title
        description
        image
        link
      }
    }
  }
`;

// Define the REMOVE_BOOK mutation for removing a book from the user's saved books
export const REMOVE_BOOK = gql`
  mutation RemoveBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      password
      bookCount
      savedBooks {
        bookId
        authors
        title
        description
        image
        link
      }
    }
  }
`;
