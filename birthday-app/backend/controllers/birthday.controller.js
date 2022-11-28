const db = require('../models/index');
const Birthday = db.birthday;


function getUserId () {
   // get it from JWT
}

// TODO for convinience to the user it's easier to ask for age
// TODO get user id to get things from their db

// find the collection means find the table probably
// TODO logic to get birthdays in a window date
// Logic for the GET request to get all birthdays
exports.get_all_birthday = async (req, res) => {
   try {
      console.log("inside get all funcion on birthday controller");
      //var dbo = db.db("mydb");
      //console.log(dbo.collection("birthday").find());
      // finding all the product in the table
      // THIS LINE IS NOT WORKING
      const birthdayResults = await Birthday.find();
      //   console.log(birthdayResults.length == 0)
      //   await cursor.forEach(console.dir);
      //    // To check in the console 
      //console.log(JSON.stringify(birthdayResults))
      //console.log(birthdayResults);
      //res.send("No birthdays")
      // res.json({
      //    data: birthdayResults
      // }).send();
      //  res.json()
      console.log("Response from birthday controller");
      //console.log(res.json({"data": birthdayResults}));
      // returns to localhost the correct values below with birthday results values, how these values don't make to the request in client
      return res.json({data: birthdayResults});
   } catch (err) {
      res.send({
         message: err
      })
   }

   //Birthday.close();
}

// Logic for the POST request to create a new birthday
exports.create_birthday = async (req, res) => {

   console.log(`Inside create_birthday function ${JSON.stringify(req.body)}`);
   // doesnt seem like any body is being sent it's empty that's why has the message it cannot be empty

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

   // check for duplicate usernames in the db
   const duplicate = await Birthday.findOne({
      firstName: firstName,
      lastName: lastName,
      birthdayDay: birthdayDay,
      birthdayMonth: birthdayMonth
   }).exec();
   if (duplicate) {
      res.sendStatus(409).send({
         message: "Record already exists."
      });
      return;
   } //Conflict 

   // retrieving data from json body of post request
   const birthday = new Birthday({
      "firstName": firstName,
      "midInitial": midInitial ? midInitial : "",
      "lastName": lastName,
      "birthdayDay": birthdayDay,
      "birthdayMonth": birthdayMonth,
      "birthdayYear": birthdayYear ? birthdayYear : "",
      "details": details ? details : ""
      // validate input format
   });

   console.log(`New birthday record ${JSON.stringify(birthday)}`);
   // Save Birthday in the database
   birthday.save()
      .then(res => {
         res.status(200).send({
            'success': `New birthday record created!`
         })
      })
      .catch(err => {
         res.status(500).send({
            message: err.message || "Some error occurred while adding new birthday record"
         })
      })

   //Birthday.close();
}

// Logic for the GET request to get all birthdays on today's date
exports.get_today_birthday = (req, res) => {
   // TODO if result empty display a message
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
      // print result only the ones we want
      .catch(err => {
         res.status(500).send({
            message: err.message || "Some error occurred while retrieving records"
         })
      })

   // //res.send("No birthdays")
   // res.json({
   //    message: birthdayResults
   // }).send();

   // birthday.save()
   // .then(result => {
   //    res.status(200).send({
   //       'success': `New birthday record created!`
   //    })
}

exports.delete_birthday = async (req, res) => {

   const {
      _id
      // firstName,
      // lastName,
      // birthdayDay,
      // birthdayMonth
   } = req.body;

   // needed the await to get the record and be deleted so I needed to add
   // async to the function to add await
   // now it was deleted
   const duplicate = await Birthday.findOne({
      _id: _id
      // firstName: firstName,
      // lastName: lastName,
      // birthdayDay: birthdayDay,
      // birthdayMonth: birthdayMonth
   });

   //console.log(duplicate.firstName)
   console.log(duplicate._id)

   //const id = req.params.productId; //checks for productId to delete
   Birthday.deleteOne({
         _id: duplicate._id
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
   // const duplicate = await Birthday.findOne({
   //    firstName: firstName,
   //    lastName: lastName,
   //    birthdayDay: birthdayDay,
   //    birthdayMonth: birthdayMonth

   // }).exec();
   // if (duplicate) {
   //    res.sendStatus(409).send({
   //       message: "Record with those info data already exists."
   //    });
   //    return;
   // } //Conflict 

   // retrieving data from json body of post request
   const birthday = new Birthday({
      "firstName": firstName,
      "midInitial": midInitial ? midInitial : "",
      "lastName": lastName,
      "birthdayDay": birthdayDay,
      "birthdayMonth": birthdayMonth,
      "birthdayYear": birthdayYear ? birthdayYear : "",
      "details": details ? details : ""
      // validate input format
   });

   //const id = req.params.productId; // get product ID from params
   // const update = {}
   // // checks for the value to be updated in item
   // for (const ops of req.body) {
   //    update[ops.propName] = ops.value;
   // }
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