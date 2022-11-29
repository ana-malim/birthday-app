const BirthdayController = require("../controllers/birthday.controller.js");
var router = require("express").Router();

// Retrieve all birthday records
router.get("/all", BirthdayController.get_all_birthday);

// Retrieve birthday records for current day
router.get("/today", BirthdayController.get_today_birthday);

// Create a new birthday record
router.post("/", BirthdayController.create_birthday);

// Delete a birthday record
router.delete("/", BirthdayController.delete_birthday);

// Update a birthday record
router.patch("/", BirthdayController.patch_birthday_details);

module.exports = router;