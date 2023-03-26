// Import the jwt library for creating and verifying tokens, and the AuthenticationError class for throwing authentication errors
const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");

// Export a middleware function that can be used to verify the authenticity of requests
exports.authMiddleware = (resolver) => {
  return function (parent, args, context, info) {
    // Extract the token from the request headers and initialize the user object
    let token = context.req.headers.authorization;
    let user = {}

    // If a token is present, verify it using the JWT_SECRET key and extract the user object from the decoded token
    if (token) {
      token = token.split(" ").pop().trim();
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      user = decoded.args;
    }

    // If the user object is empty, throw an authentication error
    if (!user) {
      throw new AuthenticationError("Authentication required.");
    }

    // Otherwise, continue with the resolver function, passing along the user object in the context
    return resolver(parent, args, { ...context, user }, info);
  };
};

// Export a function that signs a token containing the provided username, email, and _id properties, with a 24 hour expiration time
exports.signToken = ({ username, email, _id }) => {
  const payload = { username, email, _id };

  return jwt.sign({ args: payload }, process.env.JWT_SECRET, { expiresIn: "24h" });
}
