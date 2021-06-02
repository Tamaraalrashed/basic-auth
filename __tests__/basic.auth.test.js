'use strict';

const supergoose = require('@code-fellows/supergoose');
const basic = require('../src/auth/middleware/basic.js');

describe('Auth Middleware', () => {

  const req = {};
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(() => res),
  };
  const next = jest.fn();
  describe('user authentication', () => {
    it('fails a login for a user  with incorrect basic credentials', () => {
      // Change the request to match this test case
      req.headers = {
        authorization: 'Basic YWRtaW46Zm9v',
      };
      return basic(req, res, next)
        .then(() => {
          expect(next).not.toHaveBeenCalled();
          expect(res.status).toHaveBeenCalledWith(403);
        });
    }); 
   
   
  });
});