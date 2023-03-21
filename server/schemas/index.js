// Export an object containing two properties: typeDefs and resolvers
module.exports = {
    // Import and assign the GraphQL type definitions from the './typeDefs' module
    typeDefs: require('./typeDefs'),
    // Import and assign the GraphQL resolvers from the './resolvers' module
    resolvers: require('./resolvers')
}
