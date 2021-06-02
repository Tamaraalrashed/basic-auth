'use strict';

const supergoose = require('@code-fellows/supergoose');
const app  = require('../src/server.js');
const request = supergoose(app);


//arrange
let users = {
  username: 'Tamara',
  password: '12345',
};


describe('Basic Auth testing', () => {


  it('Can successfully POST to /signup to create a new user' ,async() => {


    const response = await request.post('/signup').send(users);
    
    expect(response.status).toBe(201);
    expect(response.body.username).toBe(users.username);

  });

  it('Can successfully POST to /signin to login as a user (use basic auth)', async() => {
    const response = await request.post('/signin').auth(users.username,users.password);
    
    expect(response.status).toBe(200);
    expect(response.body.username).toEqual(users.username);
    expect(response.body.password.length).toBeGreaterThan(0);
  });

  it('Should return 403 status when the username  is not correct', async() => {

    let credentials = {
      username: 'Aya',
      password: '123',
    };
    const response = await request.post('/signin').auth(credentials.username,credentials.password);

    expect(response.status).toBe(403);

  });

  it('Should return 403 status when password is missing', async() => {

    let credentials = {
      username: 'Tamara',
    };
    const response = await request.post('/signup').send(credentials);
 
    expect(response.status).toBe(403);

  }); 

});