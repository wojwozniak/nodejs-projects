// index.js
// where your node app starts

// init project
let express = require('express');
let app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
let cors = require('cors');
const { RepeatWrapping } = require('three');
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



// listen for requests :)
let listener = app.listen(process.env.PORT=3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// End of boilerplate code

const days = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat'
]

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

// Function that returns valid output for utc
const convertToDatestring = (int) => {
  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  let output = days[int.getDay()] + ", "+int.getDate() + " "+months[int.getMonth()]+" "+int.getFullYear() + " " + padTo2Digits(int.getUTCHours()) + ":" + padTo2Digits(int.getUTCMinutes()) + ":" + padTo2Digits(int.getUTCSeconds()) + " GMT";
  return output;
}

// Function checking if input is a valid date
function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

app.use("/api", (req, res) => {
  let unix; // UNIX output variable
  let utc; // UTC output variable

  // Function for sending valid responses
  const sendValidResponse = () => {
    res.set({ 'Content-Type': 'application/json' });
    res.send(JSON.stringify({
      unix: unix,
      utc: utc
    }));
  }

  // Getting request path, deleting slash and fixing URL encoding
  let date = req.path;
  date = date.substring(1);
  if (date.includes('%20')) {
    date = date.replaceAll('%20', ' ');
  }
  
  let dateObject = new Date(date);

  // Check if request is unix format
  let isUnix = true;
  for (let i = 0; i < date.length; i++) {
    // Check in regex if api request contains not a number - if yes, changing isUnix to false
    if (/^([^0-9]*)$/.test(date[i])) {
      isUnix = false;
    }
  }

  // Dealing with empty request
  if (date === "") {
    let currentDate = new Date();
    unix = currentDate.getTime();
    utc = convertToDatestring(currentDate);
    sendValidResponse();
  } else if 
  
  // Resolving request for valid unix strings
  (isUnix === true) {
    unix = parseInt(date, 10);
    let dateObj = new Date(unix);
    utc = convertToDatestring(dateObj);
    sendValidResponse();
  }
    
  // Dealing with invalid dates
  else if (!isValidDate(dateObject)) {
    res.set({ 'Content-Type': 'application/json' });
    res.send(JSON.stringify({
      error: "Invalid Date"
    }));
  } else
  
  // Dealing with valid dates
  {
    unix = dateObject.getTime();
    utc = convertToDatestring(dateObject);
    sendValidResponse();
  }
});