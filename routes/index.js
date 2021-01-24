const express = require('express');
const blog = require('./blog');
const user = require('./user');

const router = express.Router();
router.use('/users', user);
router.use('/blogs', blog);


module.exports = router;
