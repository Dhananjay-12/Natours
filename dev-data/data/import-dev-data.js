const mongoose = require('mongoose');
const fs = require('fs');
const Tour = require('./../../models/tourModel');
require('dotenv').config({ path: './config.env' });

const DB = process.env.MONGO_URI.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose.set('strictQuery', false);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log('Connected Succesfully');
  })
  .catch((err) => {
    console.log(err);
  });

//Read the tours
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf8')
);

// import data to database
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data loaded successfully');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};
//Delete All data from database

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data deleted successfully');
  } catch (err) {
    console.log(err);
  }
};

switch (process.argv[2]) {
  case '--import':
    importData();
    break;

  case '--delete':
    deleteData();
    break;
}
