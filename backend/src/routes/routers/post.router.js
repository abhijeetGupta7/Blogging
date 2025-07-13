const express = require('express');
const validateRequest = require('../../middlewares/validator');
const { body } = require('express-validator');
const { authenticateUser } = require('../../middlewares/autheticateUser');
const { createPost, getPosts, deletePost, updatePost } = require('../../controllers/post.controller');
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
   getPosts
);

postRouter.delete(
  '/deletePost/:postId',
  authenticateUser, deletePost
);

postRouter.patch(
  '/update-post/:postId',
  upload.single('file'),
  authenticateUser, updatePost
);


module.exports=postRouter;