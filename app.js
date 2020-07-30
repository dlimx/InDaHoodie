require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const apiRouter = require('./routes');

const app = express();

app.use('*', (req, res, next) => {
  if (
    req.headers['x-forwarded-proto'] !== 'https' &&
    process.env.NODE_ENV === 'production'
  ) {
    res.redirect(`https://${req.hostname}${req.url}`);
  } else {
    next(); /* Continue to other routes if we're not redirecting */
  }
});

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));

app.use('/api', apiRouter);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
