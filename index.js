const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

// Basic Configuration
const port = process.env.PORT || 3000;

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
  serverSelectionTimeoutMS: 5000
});

const connection = mongoose.connection;
connection.on('error', console.error.bind('connection error'));
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

// Creating data Schema
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

const user = mongoose.model("user", userSchema);
const log = mongoose.model("log", logSchema);
const exercise = mongoose.model("exercise", exerciseSchema);

app.post('/api/users', async (req, res) => {

});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
});
