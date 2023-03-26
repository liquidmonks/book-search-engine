// Import the gql function from the Apollo Server
const { gql } = require("apollo-server");

// Define the GraphQL schema using the gql template literal tag
module.exports = gql`
  type Book {
    _id: ID,
    bookId: String,
    authors: [String],
    title: String
    description: String,
    image: String,
    link: String,
  }

  type User {
    _id: ID,
    username: String,
    email: String,
    password: String,
    bookCount: Int,
    savedBooks: [Book]
  }

  type Auth {
    token: String,
    user: User
  }

  type Query {
    getMe: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth!
    addUser(username: String!, email: String!, password: String!): Auth!
    saveBook(authors: [String], title: String!, description: String!, bookId: String, image: String!, link: String): User!
    removeBook(bookId: String!): User!
  }
`;
