const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { default: mongoose } = require('mongoose');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

// Basic Configuration
app.use(cors());
app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

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
  serverSelectionTimeoutMS: 5000,
});

const connection = mongoose.connection;
connection.on('error', console.error.bind('connection error'));
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

// Creating data Schemas
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: String,
  _id: String
});
const logSchema = new Schema({
  username: String,
  _id: String,
  log: Array
});
const exerciseSchema = new Schema({
  username: String,
  description: String,
  duration: Number,
  date: String,
  _id: String
});

// Creating models
const USER = mongoose.model("user", userSchema);
const LOG = mongoose.model("log", logSchema);
const EXERCISE = mongoose.model("exercise", exerciseSchema);

// Posting new users
app.post('/api/users', async (req, res) => {
  const username = req.body.username;
  try {
    let findOne = await USER.findOne({
      username: username
    });
    if (findOne) {
      res.json({
        _id: findOne._id,
        username: findOne.username
      })
    } else {
      findOne = new USER({
        _id: ObjectId(),
        username: username
      })
      await findOne.save();
      res.json({
        _id: findOne._id,
        username: findOne.username
      })
    }
  } catch (err) {
      console.error(err);
      res.status(500).json('Server error');
    }
});

//Posting new exercises
app.post('/api/users/:_id/exercises', async (req, res) => {
  const userId = req.params._id;
  const description = req.body.description;
  const duration = parseInt(req.body.duration, 10);
  let date = new Date(req.body.date).toDateString();
  let newId = ObjectId();
  if (date === "Invalid Date") {
    date = new Date().toDateString();
  }
  let username = "";
  try {
    let findOne = await USER.find({ _id: userId });
    if (findOne) {
      username = findOne[0].username;
    }
    let newExercise = new EXERCISE({
      username: username,
      description: description,
      duration: duration,
      date: date,
      _id: newId
    });
    await newExercise.save();
    res.send({
      _id: userId,
      username: username,
      date: date,
      duration: duration,
      description: description
    });
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error');
  }
});

// Get array of users
app.get('/api/users', async (req, res) => {
  try {
    USER.find({}, (err, found) => {
      if (err) console.log(err);
      res.send(found);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error');
  }
});

// Get array of user logs
app.get('/api/users/:_id/logs', async (req, res) => {
  const userId = req.params._id;
  let username = "";
  let exercisesArray = [];
  try {
    let findUser = await USER.find({
      _id: userId
    });
    if (findUser) {
      username = findUser[0].username;
    } else {
      res.json({
        error: "User with that ID doesn't exist!"
      })
    }
    let find = await EXERCISE.find({ username: username });
    let helperObject = {};
    if (find) {
        for (let i = 0; i < find.length; i++) {
          helperObject = {
            description: find[i].description,
            duration: find[i].duration,
            date: find[i].date
          }
          exercisesArray.push(helperObject)
        }
     }
    let count = exercisesArray.length;
    res.send({
      _id: userId,
      username: username,
      count: count,
      log: exercisesArray
    });
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error');
  }
});

const listener = app.listen(3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
});
