// Import gql from Apollo Client for creating GraphQL queries and mutations
import { gql } from "@apollo/client";

// Define the GET_ME query for retrieving the current user's information
export const GET_ME = gql`
  query Query {
    getMe {
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
