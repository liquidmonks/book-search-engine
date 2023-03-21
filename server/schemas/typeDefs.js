// Import the gql function from the Apollo Server
const { gql } = require("apollo-server");

// Define the GraphQL schema using the gql template literal tag
module.exports = gql`
  // Define the Book type with its fields
  type Book {
    _id: ID,
    bookId: String,
    authors: [String],
    title: String
    description: String,
    image: String,
    link: String,
  }

  // Define the User type with its fields
  type User {
    _id: ID,
    username: String,
    email: String,
    password: String,
    bookCount: Int,
    savedBooks: [Book]
  }

  // Define the Auth type with its fields
  type Auth {
    token: String,
    user: User
  }

  // Define the Query type with the getMe query
  type Query {
    getMe: User
  }

  // Define the Mutation type with login, addUser, saveBook, and removeBook mutations
  type Mutation {
    login(email: String!, password: String!): Auth!
    addUser(username: String!, email: String!, password: String!): Auth!
    saveBook(authors: [String], title: String!, description: String!, bookId: String, image: String!, link: String): User!
    removeBook(bookId: String!): User!
  }
`;
