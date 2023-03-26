// Import necessary libraries and schemas
const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const bookSchema = require("./Book");

// Define the user schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    savedBooks: [bookSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Encrypt user's password before saving to the database
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// Validate user's password during login
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Add a virtual field `bookCount` to the user schema
userSchema.virtual("bookCount").get(function () {
  return this.savedBooks.length;
});

// Create and export the User model
const User = model("User", userSchema);

module.exports = User;
