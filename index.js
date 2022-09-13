// index.js
// where your node app starts

// init project
let express = require('express');
let app = express();

// Using moment.js as it solves weird bug (old code can be found in oldcode.js (it doesn't pass one automated test, idk why))
let moment = require('moment');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
let cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// End of boilerplate code

app.get('/api/:request', (req, res) => {
  let request = req.params.request;
  let unixFromDate = new Date(request).getTime();
  let parsedUnix = new Date(parseInt(request)).getTime();

  // If request is valid date then value of unixFromDate variable will be greater than 0
  if (unixFromDate > 0) {
    res.json({
      unix: moment(unixFromDate).unix() * 1000,
      utc: new Date(unixFromDate).toUTCString()
    });
  }
  
  // If first test doesn't pass - checking if request was a unix timestamp
  else if (parsedUnix > 0) {
    res.json({
      unix: moment(parseInt(request)).unix() * 1000,
      utc: new Date(parseInt(request)).toUTCString()
    });
  }
  
  // If both previous test failed then it is a invalid date (or empty request that will be handled later)
  else {
    res.json({
      error : "Invalid date"
    });
  }
});

app.get('/api', (req, res) => {
  res.json({
    unix:moment().unix()*1000,
    utc:new Date().toUTCString()
  })
});



// listen for requests :)
let listener = app.listen(process.env.PORT=3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});