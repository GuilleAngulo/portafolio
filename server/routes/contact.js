'use strict'

var express = require('express');

var ContactController = require('../controllers/contact');

var router = express.Router();

router.post('/send-email', ContactController.sendEmail);

module.exports = router;