const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
require('dotenv').config();

const { sequelize } = require('./models')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.get('/', async (req, res, next) => {
  res.send({ message: 'Awesome it works 🐻' });
});

app.use('/', require('./routes/api.route'));

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`🚀 @ http://localhost:${PORT}`)
  await sequelize.authenticate();
  console.log('database connected'); 
});

module.exports = app;
