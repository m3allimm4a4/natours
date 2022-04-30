const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const catchAsync = require('../shared/errors/catchAsyncErrors');
const AppError = require('../shared/errors/appError');
const User = require('../models/userModel');

exports.protect = catchAsync(async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new AppError('User not found', 401));
    }

    if (user.isPasswordChanged(decoded.iat)) {
      return next(new AppError('Password changed, please login again', 401));
    }

    req.user = user;
    return next();
  }
  return next(new AppError('You are not logged in! Please log in to get access.', 401));
});

exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (roles.includes(req.user.role)) {
      return next();
    }
    return next(new AppError('You do not have permission to perform this action', 403));
  };
