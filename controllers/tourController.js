const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json(tours);
};
//PARTICULAR TOUR
const getTour = (req, res) => {
  const Id = Number(req.params.id);
  const reqTour = tours.find((el) => el.id === Id);
  if (!reqTour)
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid ID',
    });

  console.log(reqTour);
  res.status(200).json(reqTour);
};
//CREATE A NEW TOUR
const createTour = (req, res) => {
  console.log(req.body);
  const newID = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newID }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err)
        throw new Error('Error occured while updating the tours-simple file');
    }
  );

  res.status(200).json(newTour);
};
//UPDATE TOUR
const updateTour = (req, res) => {
  if (req.params.id > tours.length)
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid ID',
    });

  res.status(200).json({
    stause: 'SUCCESS',
    tour: '<UPDATED TOUR HERE..>',
  });
};

//DELETE TOUR
const deleteTour = (req, res) => {
  if (req.params.id > tours.length)
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid ID',
    });

  res.status(200).json({
    stause: 'SUCCESS',
    data: 'NULL',
  });
};

module.exports = { getAllTours, getTour, createTour, updateTour, deleteTour };
