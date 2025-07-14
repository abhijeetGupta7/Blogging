const express = require('express');
const { body } = require('express-validator');
const validateRequest = require('../../middlewares/validator');
const { authenticateUser } = require('../../middlewares/autheticateUser');
const { createComment, getPostComments, likeComment, editComment, deleteComment, getComments } = require('../../controllers/comment.controller');

const commentRouter = express.Router();

commentRouter.post(
  '/create',
  authenticateUser,
  [
    body('content')
      .trim()
      .notEmpty()
      .withMessage('Comment content is required')
      .isLength({ max: 200 })
      .withMessage('Comment must be under 200 characters'),
    body('postId')
      .notEmpty()
      .withMessage('Post ID is required')
      .isMongoId()
      .withMessage('Invalid Post ID format'),
    body('userId')
      .notEmpty()
      .withMessage('User ID is required')
      .isMongoId()
      .withMessage('Invalid User ID format'),
  ],
  validateRequest, 
  createComment
);

commentRouter.get('/getPostComments/:postId', getPostComments);
commentRouter.put('/likeComment/:commentId', authenticateUser, likeComment);
commentRouter.put('/editComment/:commentId', authenticateUser, editComment);
commentRouter.delete('/deleteComment/:commentId', authenticateUser, deleteComment);
commentRouter.get('/getcomments', authenticateUser, getComments);

module.exports = commentRouter;
