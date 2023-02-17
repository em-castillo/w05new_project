const express = require('express');
const router = express.Router();

// specify best url user needs to request/ importing file
router.use('/children', require('./books'))
router.use('/user', require('./user'))

router.use('/', require('./swagger'));

module.exports = router;