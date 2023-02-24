const mongoose = require('mongoose');

require('dotenv').config({ path: './config.env' });
process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception!! SHUTTING DOWN');
  process.exit(1);
});
const app = require('./app');

// console.log(process.env);
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

//PORTS AND LISTENERS
const port = process.env.PORT || 4000;
process.on('unhandledRejection ', (err) => {
  console.log('Unhandled Rejection SHUTTING DOWN');
  server.close(() => {
    process.exit(1);
  });
});
app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
