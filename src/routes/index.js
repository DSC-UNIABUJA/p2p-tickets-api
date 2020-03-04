'use strict';

const router = require('express').Router();
const clientRouter = require('./api/client');

router.use('/client', clientRouter);

module.exports = router;
