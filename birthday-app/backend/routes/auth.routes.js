var router = require("express").Router();
const authController = require('../controllers/auth.controller');

router.post('/auth', authController.handleLogin);

module.exports = router;