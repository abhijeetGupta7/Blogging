const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const errorHandler = require('../utils/error.js');
const { hashPassword, checkPassword, generateToken } = require('../utils/authUtils.js');
const { StatusCodes } = require('http-status-codes');

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password || username === '' || email === '' || password === '') {
    return next(errorHandler(StatusCodes.BAD_REQUEST, 'All fields are required'));
  }

  const hashedPassword=await hashPassword(password);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.json('Signup successful');
  } catch (error) {
    console.log(error)
    if(error.code==11000) {
      const duplicateKey=Object.keys(error.keyValue)[0];
      error.message=`${duplicateKey.charAt(0).toUpperCase() + duplicateKey.slice(1)} already Exist`
      error.statusCode=StatusCodes.CONFLICT
    }
    next(error);
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === '' || password === '') {
    return next(errorHandler(StatusCodes.BAD_REQUEST, 'All fields are required'));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(StatusCodes.NOT_FOUND, 'User not found'));
    }

    const validPassword = await checkPassword(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(StatusCodes.BAD_REQUEST, 'Invalid password'));
    }

    const token = generateToken(
        {
         id: validUser._id, 
         isAdmin: validUser.isAdmin 
        }
    );

    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
        secure: true, 
        sameSite:"None"
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET
      );

      const { password, ...rest } = user._doc;

      return res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword =
       Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);

      const hashedPassword = await hashPassword(generatedPassword);

      const newUser = new User({
        username:
          name.toLowerCase().split(' ').join('') +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });

      await newUser.save();

      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET
      );

      const { password, ...rest } = newUser._doc;

      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  signin,
  google,
};
