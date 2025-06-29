const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array()[0]; 

    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: firstError.msg, // only the first message
      errors: errors.array(),  
    });
  }

  next();
};
