var router = require("express").Router();
const registerController = require('../controllers/register.user.controller');

// Create a new Tutorial
router.post('/signup', registerController.register_new_user);

module.exports = router;