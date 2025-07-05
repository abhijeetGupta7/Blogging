const express = require('express');
const { updateProfile, deleteUser, signoutUser } = require('../../controllers/user.controller');
const multer = require("multer");
const { authenticateUser } = require('../../middlewares/autheticateUser');

const userRouter=express.Router();

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

userRouter.put('/profile', authenticateUser , upload.single('file') , updateProfile); 
userRouter.delete('/delete', authenticateUser, deleteUser);
userRouter.post('/signout', authenticateUser, signoutUser);

module.exports=userRouter;