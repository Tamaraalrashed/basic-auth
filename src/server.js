'use strict';

// 3rd Party Resources
const express = require('express');
// const bcrypt = require('bcrypt');
// const base64 = require('base-64');
// const mongoose = require('mongoose');
const router=require('./auth/router.js');

// Prepare the express app
const app = express();

// Process JSON input and put the data on req.body
app.use(express.json());

// Process FORM intput and put the data on req.body
app.use(express.urlencoded({ extended: true }));

app.use(router);

module.exports=app;