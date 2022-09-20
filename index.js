//Importing packages
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
const shortId = require('shortid');


// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', (req, res) => {
  res.json({ greeting: 'hello API' });
});

// Getting URL from .env file
const uri = process.env.MONGO_URI;

// Estabilishing connection with server
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
});

const connection = mongoose.connection;
connection.on('error', console.error.bind('connection error'));
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

// Creating data Schema
const Schema = mongoose.Schema;
const urlSchema = new Schema({
  original_url: String,
  short_url: String
});
const URL = mongoose.model("URL", urlSchema);

// Dealing with creating new shorturls
app.post('/api/shorturl', async (req, res) => {
  const url = req.body.url;
  const urlCode = shortId.generate();
  // Checking if url is valid - regex by freecodecamp.org forum user, valid-url solution didn't pass :(
  const httpRegex = /^(http|https)(:\/\/)/;
  if (!httpRegex.test(url)) {
    return res.json({ error: 'invalid url' })
  } else {
    // Checking if short url already exist
    try {
      let findOne = await URL.findOne({
        original_url: url
      })
      // If url is found on server (short url exist) give it
      if (findOne) {
        res.json({
          original_url: findOne.original_url,
          short_url: findOne.short_url
        })
      } else {
        // If it doesn't create new URL, send it to server and then give it
        findOne = new URL({
          original_url: url,
          short_url: urlCode
        })
        await findOne.save()
        res.json({
          original_url: findOne.original_url,
          short_url: findOne.short_url
        })
      }
      // Deal with errors
    } catch (err) {
      console.error(err);
      res.status(500).json('Server error');
    }
  }
});



//Dealing with GET requests
app.get('/api/shorturl/:short_url?', async (req, res) => {
  try {
    const urlParams = await URL.findOne({
      short_url: req.params.short_url
    });
    if (urlParams) {
      return res.redirect(urlParams.original_url)
    } else {
      return res.status(404).json('No URL found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error');
  }
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
