const express = require('express');
const router = express.Router();

const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  getAliasTour,
  checkBody,
  getTourStats,
} = require('./../controllers/tourController');

router.route('/top-5-cheap').get(getAliasTour, getAllTours);
router.route('/tour-stats').get(getTourStats);
//ALL TOURS

router.route('/').get(getAllTours).post(checkBody, createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
