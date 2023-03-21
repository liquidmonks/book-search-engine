// Import necessary libraries
const { Schema } = require("mongoose");

// Define the book schema
const bookSchema = new Schema({
  authors: [String],
  description: {
    type: String,
    required: true,
  },
  bookId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
});

// Export the book schema
module.exports = bookSchema;
