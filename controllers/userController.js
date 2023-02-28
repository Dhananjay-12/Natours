const User = require('./../models/userModel');
const catchAsync = require('../utils/catchAsync');

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
});

const getUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This route is not defined yet..',
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This route is not defined yet..',
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This route is not defined yet..',
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This route is not defined yet..',
  });
};

module.exports = { getAllUsers, getUser, createUser, updateUser, deleteUser };
