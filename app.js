var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get("/about", (req,res)=> {
  res.send("Version 1.0");
})

var accountSid = 'AC531e5519183aa0bc2571f62e17495da8'; // Your Account SID from www.twilio.com/console
  var authToken = 'f08f11a93b9ccbc551a0c5b5706e6164';   // Your Auth Token from www.twilio.com/console
  
  var twilio = require('twilio');
  var twilioClient = new twilio(accountSid, authToken);

app.post("/message", (req,res)=> {

  
  
  /*SMS
  client.messages.create({
      body: 'Hello from Node',
      to: '+972547244047',  // Text this number
      from: '+12568576036' // From a valid Twilio number
  })*/
  twilioClient.messages 
        .create({ 
           body: 'Response on the incoming message', 
           from: 'whatsapp:+14155238886',       
           to: 'whatsapp:+972547244047' 
         }) 
  .then((message) => console.log(message.sid))
  .catch(err => console.log(err))
  .done();
  
  
    res.send("Got the Order:" + JSON.stringify(req.body));
  })

app.post("/order", (req,res)=> {



/*SMS
twilioClient.messages.create({
    body: 'Hello from Node',
    to: '+972547244047',  // Text this number
    from: '+12568576036' // From a valid Twilio number
})*/
twilioClient.messages 
      .create({ 
         body: 'Your Yummy Cupcakes Company order of 1 dozen frosted cupcakes has shipped and should be delivered on July 10, 2019. Details: http://www.yummycupcakes.com/', 
         from: 'whatsapp:+14155238886',       
         to: 'whatsapp:+972547244047' 
       }) 
.then((message) => console.log(message.sid))
.catch(err => console.log(err))
.done();


  res.send("Got the Order:" + JSON.stringify(req.body));
})
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
