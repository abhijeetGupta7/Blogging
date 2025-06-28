const express = require('express');
const validateRequest = require('../../middlewares/validator');
const { signup, signin } = require('../../controllers/auth.controller');
const { body } = require('express-validator');


const authRouter=express.Router();

// Public routes
authRouter.post(
  '/signup',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
    validateRequest, 
  ],
  signup
);

authRouter.post(
  '/signin',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
    validateRequest,
  ],
  signin
);

module.exports=authRouter;