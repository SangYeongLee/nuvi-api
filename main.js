const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const repliesRouter = require('./routes/replies');
const newPageRouter = require('./routes/newPageRoute');
const chatRouter = require('./routes/chat');

const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', usersRouter, postsRouter, repliesRouter, newPageRouter);
app.use('/kakao', chatRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).json({
    message:"Route Not Found."
  })
});

// error handler
app.use((err, req, res, next) => {

  res.status(err.status || 500).json({
    message: err.message,
    error: err,
  });
});

module.exports = app;
