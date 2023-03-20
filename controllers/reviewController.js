const Review = require('./../models/reviewModel');
const catchAsync = require('./../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');
const { request } = require('express');

exports.createReview = catchAsync(async (req, res, next) => {
  // nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;

  const newReview = await Review.create(req.body);
  res.status(200).json({
    status: 'SUCCESS',
    data: {
      review: newReview,
    },
  });
});

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Review.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const review = await features.query;
  //SEND RESPONSE
  res.status(200).json({
    message: 'SUCCESS',
    data: {
      review,
    },
  });
});
