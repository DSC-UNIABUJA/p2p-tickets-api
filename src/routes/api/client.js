'use strict';
const userController = require('../../controllers/user');
const authenticatorMiddleware = require('../../middlewares/authenticator');

const router = require('express').Router();

const userRouter = require('express').Router();

userRouter.post('/', userController.create);
userRouter.post('/login', userController.login);
userRouter.use(authenticatorMiddleware.jwt);
userRouter.use(authenticatorMiddleware.hydrateUser);
userRouter.post('/update', userController.update);

router.use('/user', userRouter);

module.exports = router;
