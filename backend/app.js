const express = require('express');

const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const allRoutes = require('./routes/index');
const authJwt = require('./utils/jwt');
const errorHandler = require('./utils/error_handler');

// get env variables from .env file
require('dotenv/config');
// middleware
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(morgan('tiny')); // logger
app.use(authJwt()); // secures server based on jwt.
app.use(errorHandler);

const api = process.env.API_URL;
const PORT = process.env.PORT || 3000;

app.use(`${api}`, allRoutes);

mongoose.connect(
  process.env.CONNECTION_STRING,
  {
    useUnifiedTopology: true,
  },
).then(
  () => {
    console.log('Connected to db');
  },
).catch((error) => {
  console.log({ error });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('App is listening...');
  console.log(api);
});

module.exports = app;
