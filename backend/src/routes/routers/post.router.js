const express = require('express');
const validateRequest = require('../../middlewares/validator');
const { body } = require('express-validator');
const { authenticateUser } = require('../../middlewares/autheticateUser');
const { createPost, getPosts, deletePost } = require('../../controllers/post.controller');
const multer = require('multer');

const postRouter=express.Router();


const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file format'), false);
    }
  }
});

// Public routes
postRouter.post(
  '/create',
  upload.single('file'),
  [
    body('content').notEmpty().withMessage('Content is required'),
    body('title').notEmpty().withMessage('Title is required'),
  ],
  validateRequest, 
  authenticateUser, createPost
);

postRouter.get(
  '/getPosts',
  authenticateUser, getPosts
);

postRouter.delete(
  '/deletePost/:postId',
  authenticateUser, deletePost
);


module.exports=postRouter;