'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const lyrics = require('./routes/lyrics');
const part = require('./routes/part');
const song = require('./routes/song');
const user = require('./routes/user');
const health = require('./routes/health');

// Constants
const PORT = 8085;

// App
const app = express();


//CORS Config pour indiquerq qui peut communiquer avec l'API
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_CALL );

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.set('view engine', 'handlebars');

//Pour parser les paramètres des requêtes HTTP
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

app.use('/lyrics', lyrics);
app.use('/part', part);
app.use('/song', song);
app.use('/user', user);
app.use('/health', health);

app.listen(PORT);
console.log(`Running on port ${PORT}`);


module.exports = app