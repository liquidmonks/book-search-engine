// Import the Mongoose library
const mongoose = require('mongoose');

// Connect to the MongoDB database using the provided connection string or default to 'mongodb://0.0.0.0:27017/googlebooks'
mongoose.connect(process.env.MONGODB_URI || 'mongodb://0.0.0.0:27017/googlebooks');

// Export the Mongoose connection object for use in other parts of the application
module.exports = mongoose.connection;
