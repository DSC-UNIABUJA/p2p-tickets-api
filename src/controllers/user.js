const validatorMiddleware = require('../middlewares/validator');
const ModelAdapter = require('../models/Adapter');
const User = require('../models/User');
const authUtil = require('../util/auth');

// User controller object
const userController = {};
/*

    User Controller File
    Length is used to validate the inputs to ensure they are not empty strings
 */

/*
    Creates a user
 */
userController.create = [
  validatorMiddleware.inputs([
    authUtil
      .body('email', 'email is required and should be valid')
      .isEmail()
      .normalizeEmail(),
    authUtil.body('lastName', 'Last name is required').isLength({min: 3}),
    authUtil.body('firstName', 'First name is required').isLength({min: 3}),
    authUtil
      .body(
        'password',
        'Password is required and must be at least 6 characters long and must be valid',
      )
      .isLength({min: 6})
      .matches(/[a-z]/)
      .withMessage('Password should contain at least a lowercase letter')
      .matches(/[A-Z]/)
      .withMessage('Password should contain at least a uppercase letter')
      .matches(/\d/)
      .withMessage('Password should contain at least a number'),
    authUtil
      .body('phone', 'Phone number is required')
      .optional()
      .isLength({min: 11, max: 11}),
    authUtil
      .body('bank.name', 'bank account name is required')
      .optional()
      .isLength({min: 3}),
    authUtil
      .body('bank.number', 'bank account number is required')
      .optional()
      .isLength({min: 3}),
  ]),

  async (req, res, next) => {
    const model = new ModelAdapter(User);
    try {
      const user = await model.create({...req.body});
      return res.json({
        success: true,
        details: user,
        message: 'User created successfully',
      });
    } catch (error) {
      next(error);
    }
  },
];

/*
    Updates a user
 */
userController.update = [
  async (req, res, next) => {
    try {
      const model = new ModelAdapter(User);
      const user = await model.update({id: req.id}, req.body);
      if (user === null) {
        return res.status(404).json({
          success: false,
          message: 'User with id doest not exists',
        });
      }
      // Send emails

      return res.json({
        success: true,
        details: user,
        message: 'User updated successfully',
      });
    } catch (error) {
      next(error);
    }
  },
];

/*
    Login user
 */
userController.login = [
  validatorMiddleware.inputs([
    authUtil
      .body('email', 'Email is required and must be valid')
      .isEmail()
      .normalizeEmail(),
    authUtil.body('password', 'Password is required').exists(),
  ]),
  async (req, res, next) => {
    try {
      const {email, password} = req.body;
      const model = new ModelAdapter(User);

      const user = await model.find({email});

      if (user === null) {
        return res.status(401).json({
          successful: false,
          message: 'Email or Password is invalid',
        });
      }

      if (!(await authUtil.comparePassword(password, user.password))) {
        return res.status(401).json({
          success: false,
          message: 'Email or Password is invalid',
        });
      }

      // email and password is correct
      const token = authUtil.generateJwtToken({id: user.id}, 30);

      return res.status(200).json({
        success: true,
        details: {token},
        message: 'Login successful',
      });
    } catch (err) {
      next(err);
    }
  },
];

userController.profile = [
  async (req, res, next) => {
    try {
      console.log(req.user);
      const id = req.id || req.params.id;

      if (id == null) {
        return res.status(404).json({
          success: false,
          message: 'User does not exists',
        });
      }

      const model = new ModelAdapter(User);
      const user = await model.find({id: id});
      if (user === null) {
        return res.status(404).json({
          success: false,
          message: 'User does not exists',
        });
      }

      return res.json({
        success: true,
        details: user,
        message: 'User fetched successfully',
      });
    } catch (err) {
      next(err);
    }
  },
];

/*
    Updates a user password
 */
userController.updatePassword = [
  validatorMiddleware.inputs([
    authUtil.body('oldPassword', 'Old password is required').exists(),
    authUtil
      .body('newPassword', 'New password required')
      .exists()
      .isLength({min: 6})
      .matches(/[a-z]/)
      .withMessage('Password should contain at least a lowercase letter')
      .matches(/[A-Z]/)
      .withMessage('Password should contain at least a uppercase letter')
      .matches(/\d/)
      .withMessage('Password should contain at least a number'),
  ]),
  async (req, res, next) => {
    try {
      let user = req.user;
      if (!(await authUtil.comparePassword(req.body.oldPassword, user.password))) {
        return res.status(400).json({success: false, message: 'Old password is incorrect'});
      }
      // old Password is correct
      user.password = req.body.newPassword;
      user = await user.save();

      return res.status(200).json({
        success: true,
        details: user,
        message: 'Password changed successfully',
      });
    } catch (err) {
      next(err);
    }
  },
];

module.exports = userController;
