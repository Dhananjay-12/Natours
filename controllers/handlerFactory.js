const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc)
      return next(new AppError('Cannot find document with that ID', 404));

    res.status(204).json({
      message: 'SUCCESS',
      data: null,
    });
  });
