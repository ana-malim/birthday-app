var router = require("express").Router();
const logoutController = require('../controllers/logout.controller');

router.get('/logout', logoutController.handleLogout);

module.exports = router;