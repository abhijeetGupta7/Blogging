const express = require('express');
const {
  registerUser,
  loginUser,
  getCurrentUser,
  updateUser,
  changePassword,
} = require('../../controllers/user.controller');
const { authenticateUser } = require('../../middlewares/auth.middleware');
const { body } = require('express-validator');
const validateRequest = require('../../middlewares/validator');

const userRouter = express.Router();

// Public routes
userRouter.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
    validateRequest, 
  ],
  registerUser
);

userRouter.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
    validateRequest,
  ],
  loginUser
);

// Protected Routes
userRouter.get('/me', authenticateUser, getCurrentUser);

userRouter.put(
  '/profile',
  [
    authenticateUser,
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('email').optional().isEmail().withMessage('Valid email is required'),
    validateRequest,
  ],
  updateUser
);

userRouter.put(
  '/password',
  [
    authenticateUser,
    body('currentPassword')
      .notEmpty()
      .withMessage('Current password is required'),
    body('newPassword')
      .isLength({ min: 6 })
      .withMessage('New password must be at least 6 characters'),
    validateRequest,
  ],
  changePassword
);

module.exports = userRouter;
