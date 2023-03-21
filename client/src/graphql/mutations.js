import { gql } from '@apollo/client';


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
`

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
`

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
`

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
`