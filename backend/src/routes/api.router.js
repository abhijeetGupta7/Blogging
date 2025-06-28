const express=require('express');
const userRouter = require('./routers/user.router');
const authRouter = require('./routers/auth.route');

const apiRouter=express.Router();

apiRouter.use("/auth",authRouter)
// apiRouter.use("/user",userRouter)

apiRouter.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

module.exports=apiRouter;