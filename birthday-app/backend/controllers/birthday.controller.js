const db = require('../models/index');
const Birthday = db.birthday;

// TODO for convinience to the user it's easier to ask for age
// TODO create userId for brithday model to determine what birthday belongs to each user collection and use to display
// the correct birthday when user is logged in
// TODO close the database

// find the collection means find the table
// TODO logic to get birthdays in a window date

// Logic for the GET request to get all birthdays
exports.get_all_birthday = async (req, res) => {
   try {
      console.log("inside get all funcion on birthday controller");
      const birthdayResults = await Birthday.find();
      return res.json({
         data: birthdayResults
      });

   } catch (err) {
      res.send({
         message: err
      })
   }
}

// Logic for the POST request to create a new birthday
exports.create_birthday = async (req, res) => {

   const {
      firstName,
      midInitial,
      lastName,
      birthdayDay,
      birthdayMonth,
      birthdayYear,
      details
   } = req.body;

   // Validate request
   if (!firstName || !lastName || !birthdayDay || !birthdayMonth) {
      res.status(400).send({
         message: "Name, last name and birthday date cannot be empty!"
      });
      return;
   }

   //Check for record duplicate
   const duplicate = await Birthday.findOne({
      firstName: firstName,
      lastName: lastName,
      birthdayDay: birthdayDay,
      birthdayMonth: birthdayMonth
   }).exec();

   if (duplicate) {
      res.status(409).send({
         message: "Record already exists."
      });
      return;
   } //Conflict 

   // Create a new birthday document
   // TODO validate input format on db insert
   const birthday = new Birthday({
      "firstName": firstName,
      "midInitial": midInitial ? midInitial : "",
      "lastName": lastName,
      "birthdayDay": birthdayDay,
      "birthdayMonth": birthdayMonth,
      "birthdayYear": birthdayYear ? birthdayYear : "",
      "details": details ? details : ""
   });

   // Save birthday record in the database
   birthday.save()
      .then(result => {
         res.status(200).send({
            'success': `New birthday record created!`
         });
      })
      .catch(err => {
         res.status(500).send({
            message: err.message || "Some error occurred while adding new birthday record"
         })
      })
}

// Logic for the GET request to get all birthdays on today's date
exports.get_today_birthday = (req, res) => {

   // TODO return the correct response when it's empty results
   const today = new Date();
   const month = today.getMonth() + 1;
   const day = today.getDate();

   console.log(`Day: ${day} Month: ${month}`)

   Birthday.find({
         birthdayDay: day,
         birthdayMonth: month
      })
      .then(result => {
         res.status(200).json({
            data: result
         }).send()
      })
      // if product is found then returned
      .catch(err => {
         res.status(500).send({
            message: err.message || "Some error occurred while retrieving records"
         })
      })
}

exports.delete_birthday = async (req, res) => {

   const {
      _id
   } = req.body;

   // needed the await to get the record and be deleted so I needed to add
   // async to the function to add await
   const record = await Birthday.findOne({
      _id: _id
   });

   Birthday.deleteOne({
         _id: record._id
      }) // removes product from table
      .exec()
      .then(res => {
         res.status(200).send({
            'success': `Birthday record deleted!`
         })
      })
      .catch(err => {
         res.status(500).send({
            message: err.message || "Some error occurred while adding new birthday record"
         })
      })
}

exports.patch_birthday_details = async (req, res) => {

   const {
      _id,
      firstName,
      midInitial,
      lastName,
      birthdayDay,
      birthdayMonth,
      birthdayYear,
      details
   } = req.body;

   // Validate request
   if (!firstName || !lastName || !birthdayDay || !birthdayMonth) {
      res.status(400).send({
         message: "Name, last name and birthday date cannot be empty!"
      });
      return;
   }

   // TODO find duplicates when editing
   // check for duplicate usernames in the db

   Birthday.updateOne({
         _id: _id
      }, {
         $set: {

            firstName: firstName,
            midInitial: midInitial ? midInitial : "",
            lastName: lastName,
            birthdayDay: birthdayDay,
            birthdayMonth: birthdayMonth,
            birthdayYear: birthdayYear ? birthdayYear : "",
            details: details ? details : ""

         }
      })
      .exec()
      .then(result => {
         res.status(200).send({
            'success': `Birthday record updated! ${JSON.stringify(result)}`

         })
      })
      .catch(err => {
         res.status(500).send({
            message: err.message || "Some error occurred while updating birthday record"
         })
      })
}