// we are making express router to handle different kinds of request like get/post/patch/delete
//const express = require('express')
//const router = express.Router()
// We will me making this file in next step which will handle all our logic 
//const BirthdayController = require('../controllers/birthday.controller')
// All these routes are there for our products like this: 
// (http://localhost:5000/products/get) for getting all product
// (http://localhost:5000/products/post) for posting a product
// TODO option to pick a range of date and show the birthdays from that window
// or by someone's name
// api/tutorials/:id
//router.get('api/birthday', BirthdayController.get_all_birthday);
// router.post('api/birthday',BirthdayController.create_birthday)
// // get today's birthday
// router.get('api/birthday/:month/:day', BirthdayController.get_today_birthday)
// router.patch('api/birthday/:name/:lastName/:month/:day',BirthdayController.patch_birthday_details)
// router.delete('api/birthday/:name/:lastName/:month/:day',BirthdayController.delete_birthday)
//module.exports = router

//module.exports = app => {

    const BirthdayController = require("../controllers/birthday.controller.js");
    //console.log("inside router")
  
    var router = require("express").Router();

    // Retrieve all Tutorials
    router.get("/all", BirthdayController.get_all_birthday);
  
    // Create a new Tutorial
    router.post("/", BirthdayController.create_birthday);    
  
    // Retrieve all published Tutorials
    router.get("/today", BirthdayController.get_today_birthday);

    // Delete a Tutorial with id
    router.delete("/", BirthdayController.delete_birthday);
    // router.delete("/:id", birthday.delete_birthday);
    
    // Update a Tutorial with id
    router.patch("/", BirthdayController.patch_birthday_details);
  
     
    //app.use('/api/birthday', router);
 // };


//  router.route('/')
//  .get(employeesController.getAllEmployees)
//  .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.createNewEmployee)
//  .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.updateEmployee)
//  .delete(verifyRoles(ROLES_LIST.Admin), employeesController.deleteEmployee);

// router.route('/:id')
//  .get(employeesController.getEmployee);

 module.exports = router;