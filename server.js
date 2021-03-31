const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();
const url = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;
const app = express();

app.set('port', (process.env.PORT || 5000));
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(url).then(() => console.log("Mongo DB connected")).catch(err => console.log(err));

var api = require('./api.js');
api.setApp(app, mongoose);


app.use((req, res, next) =>
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
});

app.listen(PORT, () =>
{
    console.log('Server listening on port ' + PORT);
});