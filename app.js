const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);

// Define routes here
const indexRoute = require('./routes');

// invoke express on port 5000
const app = express();
const port = process.env.PORT || 5000;

require('dotenv').config();


var store = new MongoDBStore({
  uri: process.env.DATABASE_URL,
  collection: 'sessions',
  unset: 'destroy'
});

store.on('error', function (error) {
  console.log(error);
});

app.use(session({
  secret: 'Somesercrets',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 1 // 1 day
  },
  //store: store,
  resave: true,
  saveUninitialized: false
}));

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true
});
const connection = mongoose.connection;

connection.once('open', function () {
  console.log("MongoDB database connection established successfully");
})

app.use(cors());
app.use(express.json());

// invoke routes
app.use('/', indexRoute);


app.listen(port, function () {
  console.log("Server is running on Port: " + port);
});

module.exports = app;