var express = require('express');
var cors = require('cors');
require('dotenv').config()

var app = express();

app.use(cors());

// multer config
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

// filesystem config
const fs = require('fs');
const path = require('path');

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

// api for uploading file
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {

  let fileName = req.file.originalname;
  let fileType = req.file.mimetype;
  let fileSize = req.file.size;

  // clear folder as file unrequired
  fs.readdir('uploads', (err, files) => {
    if (err) throw err;
  
    for (const file of files) {
      fs.unlink(path.join('uploads', file), err => {
        if (err) throw err;
      });
    }
  });

  res.json({
    "name": fileName,
    "type": fileType,
    "size": fileSize
  })
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
