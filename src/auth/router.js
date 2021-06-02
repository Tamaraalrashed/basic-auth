'use strict';

// 3rd Party Resources
const express = require('express');
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const mongoose = require('mongoose');
const Users=require('../auth/models/users-model.js');
const app=express.Router();

const basicAuth=require('../auth/middleware/basic.js');


// Signup Route -- create a new user
// Two ways to test this route with httpie
// echo '{"username":"john","password":"foo"}' | http post :3000/signup
// http post :3000/signup usernmae=john password=foo
app.post('/signup', async (req, res) => {

  try {
    const user = new Users(req.body);
    const record = await user.save(req.body);
    res.status(201).json(record);
  } 
  catch (e) { res.status(403).send('Error Creating User'); }
});
  


// Signin Route -- login with username and password
// test with httpie
// http post :3000/signin -a john:foo
app.post('/signin', basicAuth, (req, res) => {});

module.exports=app;