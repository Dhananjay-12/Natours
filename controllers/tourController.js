const fs = require('fs');

const Tour = require('./../models/tourModel');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

// const checkId = (req, res, next, val) => {
//   if (val > tours.length)
//     return res.status(404).json({
//       status: 'Fail',
//       message: 'Invalid ID',
//     });
//   next();
// };

const checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }
  next();
};

const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({
      message: 'SUCCESS',
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err.message,
    });
  }
};
//PARTICULAR TOUR
const getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(201).json({
      status: 'SUCCESS',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'FAILED',
      message: err.message,
    });
  }
};

//CREATE A NEW TOUR

const createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      message: 'SUCCESS',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Fail',
      message: err.message,
    });
  }
};
//UPDATE TOUR
const updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ message: 'Data Updated Successfully', tour });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err.message,
    });
  }
};

//DELETE TOUR
const deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      message: 'Deleted Successfully',
      data: 'NULL',
    });
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: err.message,
    });
  }
};

module.exports = {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  checkBody,
};
