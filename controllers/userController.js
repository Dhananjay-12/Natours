const User = require('./../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const filterObj = (obj, ...allowedFields) => {
  // const newObj = {};
  // Object.keys(obj).forEach((el) => {
  //   if (allowedField.includes(el)) {
  //     newObj[el] = obj[el];
  //   }
  // });
  // return newObj;
  const newObj = {};
  for (let key in obj) {
    if (allowedFields.includes(key)) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
};

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
});

const updateMe = catchAsync(async (req, res, next) => {
  //if user send password
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('This route does not update password', 400));
  }

  const filterBody = filterObj(req.body, 'name', 'email');
  const updatedUser = await User.findOneAndUpdate(req.user.id, filterBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'SUCCESS',
    user: updatedUser,
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
    message: 'This route is not defined yet 1..',
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This route is not defined yet 2..',
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This route is not defined yet 3..',
  });
};

module.exports = {
  getAllUsers,
  updateMe,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
