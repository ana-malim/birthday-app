const mongoose = require('mongoose') // required to make the schema


/// This Mongoose Model represents birthday collection in MongoDB database
const birthdaySchema = mongoose.Schema({
    firstName: {
      type: String,
      required: true,
      minlength: [2, "Too few characters!"],
      maxlength: [20, "Too many characters!"]
    },
    midInitial: {
      type: String,
      required: false
    },
    lastName: {
      type: String,
      required: true,
      minlength: [2, "Too few characters!"],
      maxlength: [30, "Too many characters!"]
    },
  // format must be ('YYYY-MM-DD') validate in the server side// will have separate fields for user to pick day month and year
  // on client side send only numbers
  // check things like 30 - 31 days in which month (feb 28) // or do to select month and displays how many days
  // can insert error message too
   birthdayDay: {
      type: Number,
      required: true,
      min: 1,
      max: 31
    },
    birthdayMonth: {
      type: Number,
      required: true,
      min: 1,
      max: 12
    },
    birthdayYear: {
      type: Number,
      required: false,
      min: 1900, 
      max: (new Date).getFullYear()
      // custom validation 
    },
  details: {
    type: String,
    required: false,
    maxlength: [250, "Too many characters!"]
  }
})
// TODO add photo file
// we are exporting our schema for table Products.

module.exports = mongoose.model('Birthday', birthdaySchema);