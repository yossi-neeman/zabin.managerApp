var express = require('express');
var router = express.Router();

/* handle a posted message */
var accountSid = 'AC531e5519183aa0bc2571f62e17495da8'; // Your Account SID from www.twilio.com/console
var authToken = '962e729a6a42a973891ae9833196222c';   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var twilioClient = new twilio(accountSid, authToken);

router.post("/deliverystatus", (req, res) => {

    console.log("req.url: " + JSON.stringify(req.url));
    console.log("req.headers: " + JSON.stringify(req.headers));
    console.log("req.body: " + JSON.stringify(req.body));
  
  
    console.log("req: " + req);
  
    res.send("deliverystatus:" + JSON.stringify(req.body));
  })

module.exports = router;


