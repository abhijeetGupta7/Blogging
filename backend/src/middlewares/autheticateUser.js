const { verifyToken } = require('../utils/authUtils');
const errorHandler = require('../utils/error');

const authenticateUser = (req, res, next) => {
  try {
  
    const token = req.cookies.access_token;
    if (!token) {
      return next(errorHandler(401, 'Unauthorized'));
    }

    const decoded = verifyToken(token);

    if (!decoded || !decoded.id) {
      return next(errorHandler(401, 'Unauthorized'));
    }

    req.user = decoded;
    next();
  } catch (err) {
    return next(errorHandler(401, 'Unauthorized'));
  }
};

module.exports = { authenticateUser };
