var express = require('express');
var router = express.Router();
require('dotenv').config();
/* handle a posted message */
var accountSid = process.env.ACCOUNT_SID;//'AC531e5519183aa0bc2571f62e17495da8'; // Your Account SID from www.twilio.com/console
var authToken = process.env.AUTH_TOKEN;//'962e729a6a42a973891ae9833196222c';   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var twilioClient = new twilio(accountSid, authToken);

router.post('/', function(req, res, next) {
    console.log("req.url: " + JSON.stringify(req.url));
    console.log("req.headers: " + JSON.stringify(req.headers));
    console.log("req.body: " + JSON.stringify(req.body));
  
    twilioClient.messages
      .create({
        body: 'message was: ' + '*' + req.body.Body + '*',
        from: 'whatsapp:+14155238886',
        to: req.body.From,
        MediaUrl0:"https://zabin-manager.s3.us-east-2.amazonaws.com/images/milk3precentTara.jpg"
      })
      .then((message) => console.log("response is: " + message))
      .catch(err => console.log(err))
      .done();
  
  
    res.send("message:" + JSON.stringify(req.body));
});

module.exports = router;