var express = require('express'),
    router = express.Router();

router.use('/project', require('./project'));
router.use('/user', require('./user'));

module.exports = router;