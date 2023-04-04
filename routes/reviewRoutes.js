const express = require('express');
const router = express.Router({ mergeParams: true });
const authController = require('./../controllers/authController');
const reviewController = require('./../controllers/reviewController');

router
  .get('/', reviewController.getAllReviews)
  .post(
    '/',
    authController.protect,
    authController.restrictTo('user'),
    reviewController.createReview
  );
router.route('/:id').delete(reviewController.deleteReview);
module.exports = router;
