const express = require('express');
const router = express.Router();
const authController = require('./../controllers/authController');
// const reviewController = require('./../controllers/reviewController');
const reviewRouter = require('./../routes/reviewRoutes');
const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  getAliasTour,
  checkBody,
  getTourStats,
  getMonthlyPlan,
} = require('./../controllers/tourController');

router.use('/:tourId/reviews', reviewRouter);
router.route('/top-5-cheap').get(getAliasTour, getAllTours);
router.route('/tour-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(getMonthlyPlan);
//ALL TOURS

router
  .route('/')
  .get(getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    checkBody,
    createTour
  );
router
  .route('/:id')
  .get(getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    deleteTour
  );

module.exports = router;

// router
//   .route('/:tourId/reviews')
//   .post(
//     authController.protect,
//     authController.restrictTo('user'),
//     reviewController.createReview
//   );
