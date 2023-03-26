// Import the User model
const { User } = require("../models");
// Import the ApolloError class for handling errors
const { ApolloError } = require("apollo-server");

// Define the saveBook function to save a book to a user's savedBooks list
exports.saveBook = async (_, args, context) => {
  try {
    // Extract the user from the context
    const { user } = context;

    // Update the user by adding the book to the savedBooks list
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id }, // Find the user by their ID
      { $addToSet: { savedBooks: args } }, // Add the book to the savedBooks list
      { new: true, runValidators: true } // Return the updated document and run validations
    );

    // Return the updated user
    return updatedUser;
  } catch (error) {
    // If there's an error, throw it
    throw error;
  }
};

// Define the removeBook function to remove a book from a user's savedBooks list
exports.removeBook = async (_, args, context) => {
  try {
    // Extract the user from the context
    const { user } = context;

    // Update the user by removing the book from the savedBooks list
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id }, // Find the user by their ID
      { $pull: { savedBooks: { bookId: args.bookId } } }, // Remove the book with the specified bookId
      { new: true } // Return the updated document
    );

    // If the user is not found, throw an error
    if (!updatedUser) {
      throw new ApolloError("User not found");
    }

    // Return the updated user
    return updatedUser;
  } catch (error) {
    // If there's an error, throw it
    throw error;
  }
};
