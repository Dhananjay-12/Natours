const express = require('express');
const router = express.Router();
const authController = require('./../controllers/authController');
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

router.route('/top-5-cheap').get(getAliasTour, getAllTours);
router.route('/tour-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(getMonthlyPlan);
//ALL TOURS

router
  .route('/')
  .get(authController.protect, getAllTours)
  .post(checkBody, createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
