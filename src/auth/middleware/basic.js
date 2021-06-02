'use strict';
const base64 = require('base-64');
const bcrypt = require('bcrypt');
const Users=require('../models/users-model.js');
/*
    req.headers.authorization is : "Basic sdkjdsljd="
    To get username and password from this, take the following steps:
      - Turn that string into an array by splitting on ' '
      - Pop off the last value
      - Decode that encoded string so it returns to user:pass
      - Split on ':' to turn it into an array
      - Pull username and password from that array
  */

async  function basicAuth (req,res,next){
  // console.log('tamara',req.headers.authorization);
  let basicHeaderParts = req.headers.authorization.split(' ');  // ['Basic', 'sdkjdsljd=']
  let encodedString = basicHeaderParts.pop();  // sdkjdsljd=
  // console.log('tamara2',encodedString);
  let decodedString = base64.decode(encodedString);// "username:password"
  // console.log('tamara3',decodedString); 
  let [username, password] = decodedString.split(':'); // username, password
  try {
    const user = await Users.findOne({ username: username });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      res.status(200).json(user);
      next();
    }
    else {
      next({message: 'Incorrect User'});
      // throw new Error('Invalid User');
    }
  } catch (error) { res.status(403).send('Invalid Login'); }

}

module.exports=basicAuth;