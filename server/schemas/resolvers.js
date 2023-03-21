// Import functions from the user and book controllers
const { login, addUser, getMe } = require('../controllers/user')
const { removeBook, saveBook } = require('../controllers/book')
// Import the authentication middleware
const { authMiddleware } = require('../utils/auth')

// Export the GraphQL resolvers
module.exports = {
    // Define the Query resolvers
    Query: {
        // Use the authMiddleware to protect the getMe resolver
        getMe: authMiddleware(getMe)
    },
    // Define the Mutation resolvers
    Mutation: {
        // Map the login function to the login resolver
        login,
        // Map the addUser function to the addUser resolver
        addUser: addUser,
        // Use the authMiddleware to protect the saveBook resolver and map the saveBook function
        saveBook: authMiddleware(saveBook),
        // Use the authMiddleware to protect the removeBook resolver and map the removeBook function
        removeBook: authMiddleware(removeBook)
    }
}
