// IMPORT THE JSONWEBTOKEN PACKAGE FOR JWT HANDLING
const jwt = require('jsonwebtoken');

// SET TOKEN SECRET AND EXPIRATION DATE FOR JWT
const secret = 'mysecretsshhhhh'; //  SHOULD BE STRONGER IN PRODUCTION
const expiration = '2h'; // SET THE EXPIRATION TIME FOR THE TOKEN 

module.exports = { 
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    return req;
  },
  generateToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};

// checkPoint!!!!
