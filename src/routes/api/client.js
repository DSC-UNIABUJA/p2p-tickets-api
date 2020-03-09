'use strict';
const userController = require('../../controllers/user');

const router = require('express').Router();

const userRouter = require('express').Router();

userRouter.post('/', userController.create);
userRouter.post('/login', userController.login);

router.use('/user', userRouter);

module.exports = router;
