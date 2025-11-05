const express = require('express');
const app = express();
const captainRoutes = require('./routes/captain.routes');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const connectDB = require('./config/db');
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));



app.use('/', captainRoutes);


module.exports = app;