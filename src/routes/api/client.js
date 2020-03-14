'use strict';
const express = require('express');

const userController = require('../../controllers/user');
const authenticatorMiddleware = require('../../middlewares/authenticator');
const eventController = require('../../controllers/event');

const router = express.Router();

const userRouter = express.Router();
userRouter.post('/', userController.create);
userRouter.post('/login', userController.login);
userRouter.use(authenticatorMiddleware.jwt);
userRouter.use(authenticatorMiddleware.hydrateUser);
userRouter.post('/update', userController.update);

const eventRouter = express.Router();
eventRouter.use(authenticatorMiddleware.jwt);
eventRouter.use(authenticatorMiddleware.hydrateUser);
eventRouter.post('/create', eventController.create);
eventRouter.post('/buyticket', eventController.buyTicket);

router.use('/user', userRouter);
router.use('/event', eventRouter);

module.exports = router;
