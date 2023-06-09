var createError = require('http-errors');
var express = require('express');
var path = require('path');
let http = require('http');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let session = require('express-session');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let authRoot = require('./routes/auth');
let mainRouter = require('./routes/main');
let tasksRoute = require('./routes/tasks-handling');
let setupRoute = require('./routes/setup-data');
let profileRoute = require('./routes/profile');
let passChangeRoute = require('./routes/password-change');
var app = express();

let {sessionMiddleware} = require('./module/middlewares/express-middlewares');

sessionMiddleware(app);
let server = http.createServer(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(mainRouter);
app.use(authRoot);
app.use(tasksRoute);
app.use(setupRoute);
app.use(profileRoute);
app.use(passChangeRoute);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {error: err.status});
});

server.listen(3000);

module.exports = app;