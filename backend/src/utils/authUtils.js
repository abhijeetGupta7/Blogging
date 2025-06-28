const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/server-config');

const hashPassword=async (password) => {
    return bcrypt.hash(password, 10);
}

const checkPassword=async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
}

const generateToken=(data) =>{
    const token=jwt.sign(
        data,
        JWT_SECRET,
        { expiresIn: '24h' }
    )
    return token
}

const verifyToken=(token) => {
    return jwt.verify(token, JWT_SECRET);
}

module.exports={
    hashPassword,
    checkPassword,
    generateToken,
    verifyToken
}