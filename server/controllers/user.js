// Import the User model
const { User } = require('../models')
// Import the ApolloError class for handling errors
const { ApolloError } = require('apollo-server')
// Import the signToken utility function for authentication
const { signToken } = require('../utils/auth')

// Define the getMe function to get the current user's information
exports.getMe = async (_, args, context) => {
    // Extract the user from the context
    const { user } = context
    try {
        // Find the user in the database by their ID
        const foundUser = await User.findById(user._id)

        // If the user is not found, throw an error
        if (!foundUser) {
            throw new ApolloError('User not found')
        }

        // Return the found user
        return foundUser
    } catch (error) {
        // If there's an error, throw it
        throw error
    }
}

// Define the login function to authenticate a user
exports.login = async (_, args) => {
    try {
        // Extract email and password from the arguments
        const { email, password } = args

        // Find the user by their email
        const user = await User.findOne({ email });

        // If the user is not found, throw an error
        if (!user) {
            throw new ApolloError('Email or password is incorrect');
        }

        // Check if the provided password is correct
        const isValidPassword = await user.isCorrectPassword(password);

        // If the password is incorrect, throw an error
        if (!isValidPassword) {
            throw new ApolloError('Email or password is incorrect');
        }

        // If authentication is successful, return the token and user object
        return {
            token: signToken(user),
            user,
        };
    } catch (error) {
        // If there's an error, throw it
        throw error
    }
};

// Define the addUser function to register a new user
exports.addUser = async (_, args) => {
    try {
        // Extract username, email, and password from the arguments
        const { username, email, password } = args

        // Check if the email already exists in the database
        const emailExist = await User.findOne({ email })
        if (emailExist) {
            throw new ApolloError('Email already exist');
        }

        // Check if the username already exists in the database
        const usernameExist = await User.findOne({ username })
        if (usernameExist) {
            throw new ApolloError('Username already exist');
        }

        // Create a new user with the provided information and an empty savedBooks array
        const user = await User.create({ username, email, password, savedBooks: [] });

        // Return the generated token and the created user object
        return {
            token: signToken(user),
            user,
        };

    } catch (error) {
        // If there's an error, throw it
        throw error
    }
}
