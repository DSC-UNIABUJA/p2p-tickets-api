const validatorMiddleware = require('../middlewares/validator');
const authUtil = require('../util/auth');
const ModelAdapter = require('../models/Adapter');
const User = require('../models/User');
const Ticket = require('../models/Ticket');
const Payment = require('../models/Payment');
const Event = require('../models/Event');
const paystack = require('paystack')(process.env.PAYSTACK_KEY);
const eventController = {};

eventController.buyTicket = [
  validatorMiddleware.inputs([
    authUtil.body('eventId', 'Event id is compulsory').exists(),
    authUtil.body('ticketPackageId', 'Ticket package id is compulsory').exists(),
    authUtil
      .body('email')
      .optional()
      .isEmail(),
    authUtil.body('phone').optional(),
  ]),
  /**
   *  Generates a ticket and redirect user to pay
   * @param {require('express').Request} req
   * @param {require('express').Request} res
   */
  async (req, res, next) => {
    try {
      // Check if user with email exists  else create a new user
      let model = new ModelAdapter(User);
      let user = await model.find({email: req.body.email});
      if (user == null) {
        user = await model.create({email: req.body.email, phone: req.body.phone});
      }

      // Get event
      model = new ModelAdapter(Event);
      const event = await model.find({id: req.body.eventId});
      const ticketPackage = event.ticketPackage.find(t => req.body.ticketPackageId == t.id);

      // Create a ticket
      model = new ModelAdapter(Ticket);
      const ticket = await model.create({event: req.body.eventId, user: user.id});

      // Create a payment
      model = new ModelAdapter(Payment);
      const payment = await model.create({amount: ticketPackage.amount, ticket: ticket.id});
      const trans = await paystack.transaction.initialize({
        reference: payment.id,
        email: user.email,
        amount: payment.amount,
        name: user.email,
        metadata: {
          phone: user.phone,
        },
      });
      return res.status(200).json({
        success: true,
        details: trans.data,
      });
    } catch (err) {
      next(err);
    }
  },
];

eventController.create = [
  validatorMiddleware.inputs([
    authUtil.body('name', 'Event name is compulsory'),
    authUtil.body('location', 'Event location is required'),
    authUtil.body('ticketPackage', 'Ticket packages is required').toArray(),
    authUtil.body('coordinates').optional(),
  ]),
  async (req, res, next) => {
    try {
      // Get admin id
      const id = req.id;
      const model = new ModelAdapter(Event);
      const event = model.create({...req.body, admin: id});
      return res.json({
        success: true,
        details: event,
        message: 'Event created successfully',
      });
    } catch (err) {
      next(err);
    }
  },
];
module.exports = eventController;
