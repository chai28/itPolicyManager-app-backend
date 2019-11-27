const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Define routes here
const indexRoute = require('./routes');


// invoke express on port 5000
const app = express();
const port = process.env.PORT || 5000;

mongoose.connect('mongodb://127.0.0.1:27017/it_psych_db', {
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