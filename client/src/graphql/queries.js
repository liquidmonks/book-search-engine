import { gql } from '@apollo/client';


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
  
`