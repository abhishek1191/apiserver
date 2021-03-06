var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var app = express();

var findByName = require('./services/database');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index);
app.use('/users', users);
//app.use('/login', login);

passport.use(new LocalStrategy(
    function (username, password, done) {
        findByName(username, validateUser.bind(this,done));
    }
));

function validateUser(done, docs, a, b) {
    if(docs && docs.length > 0) {
       let user = docs[0];
        if (user && user.name === 'Coffee Taster') {
            return done(null, true, {message : 'Welcome ' + user.name});
        }
    }
    return done(null, false, {message : 'Incorrect Credentials'});
}


app.post('/login',function(req,res){
    passport.authenticate('local',
        // { successRedirect: '/',
        // failureRedirect: '/login'})(req, res);

        function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.send('invalid creds');
        }
        return res.send(info.message);
    })(req, res);
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
