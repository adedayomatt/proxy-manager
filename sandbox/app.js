const createError = require('http-errors');
const express = require('express');
const app = express();
const { ProxyManager} = require("../index");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const proxyManager = new ProxyManager(app)

app.use('/', proxyManager.getManagementRouter())
proxyManager.addDocumentation()

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
  res.render('error');
});

module.exports = app;
