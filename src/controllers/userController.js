const User = require('../models/userModel');
const catchAsync = require('../shared/errors/catchAsyncErrors');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  return res.status(200).json({
    status: 'success',
    data: {
      users: users,
    },
  });
});

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    data: 'route not implemented',
  });
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    data: 'route not implemented',
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    data: 'route not implemented',
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'success',
    data: 'route not implemented',
  });
};
