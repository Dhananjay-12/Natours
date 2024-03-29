const User = require('./../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  for (let key in obj) {
    if (allowedFields.includes(key)) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
};

const getAllUsers = factory.getAll(User);

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

const deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({ status: 'SUCCESS', data: null });
});

// const getUser = (req, res) => {
//   res.status(500).json({
//     status: 'Error',
//     message: 'This route is not defined yet..',
//   });
// };
const getUser = factory.getOne(User);
const createUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This route is not defined yet 1..',
  });
};
const getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};
const updateUser = factory.updateOne(User);
const deleteUser = factory.deleteOne(User);

module.exports = {
  getAllUsers,
  updateMe,
  deleteMe,
  getUser,
  createUser,
  getMe,
  updateUser,
  deleteUser,
};
