// Load environment variables from a .env file using dotenv
require("dotenv").config();

// Require necessary packages and modules
const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const http = require("http");
const { typeDefs, resolvers } = require("./schemas");
const db = require("./db");

// Create an express application and an http server instance
const app = express();
const httpServer = http.createServer(app);

// Create a new instance of ApolloServer with the specified typeDefs, resolvers, and options
const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  introspection: true,
  cache: "bounded",
  context: async ({ req }) => {
    return { req };
  },
});

// Listen for the 'open' event of the db connection and start the server once the connection is established
db.once("open", async () => {
  try {
    // Start the ApolloServer instance
    await server.start();

    // Apply the ApolloServer middleware to the express app
    server.applyMiddleware({ app, path: "/" });

    // Get the port number from the environment variable 'PORT', or default to 5000
    const PORT = process.env.PORT || 5000;
    // Listen for incoming requests on the specified port
    await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
    // Log the server URL to the console
    console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  } catch (error) {
    console.log(error);
  }
});
