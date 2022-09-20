var express = require('express');
var cors = require('cors');
require('dotenv').config();

const multer = require('multer');
const uploaded = multer({ dest: 'uploads/' });


var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const port = process.env.PORT || 3000;

app.post('/api/fileanalyse', uploaded.single('upfile'), (req, res) => {
  try {
    res.json({
      "name": req.file.originalname,
      "type": req.file.mimetype,
      "size": req.file.size
    });
  } catch (err) {
    res.send(400);
  }

  res.send("placeholder");
});

app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
