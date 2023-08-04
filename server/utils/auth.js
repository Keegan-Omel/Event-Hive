// IMPORT THE JSONWEBTOKEN PACKAGE FOR JWT HANDLING
const jwt = require('jsonwebtoken');

// SET TOKEN SECRET AND EXPIRATION DATE FOR JWT
const secret = 'mysecretsshhhhh'; // REPLACE WITH A STRONG AND SECURE SECRET KEY
const expiration = '2h'; // SET THE EXPIRATION TIME FOR THE TOKEN (e.g., 2 hours)

module.exports = {
  // MIDDLEWARE FUNCTION FOR AUTHENTICATED ROUTES
  authMiddleware: function ({ req }) {
    // ALLOW TOKEN TO BE SENT VIA req.query, req.body, OR HEADERS
    let token = req.body.token || req.query.token || req.headers.authorization;

    // EXTRACT THE TOKEN VALUE AFTER THE "Bearer" PREFIX IN HEADERS
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    // IF NO TOKEN PRESENT, SIMPLY RETURN THE REQUEST OBJECT
    if (!token) {
      return req;
    }

    // VERIFY TOKEN AND EXTRACT USER DATA FROM IT
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data; // ATTACH USER DATA TO THE REQUEST OBJECT FOR FURTHER PROCESSING
    } catch {
      console.log('Invalid token'); // HANDLE INVALID TOKENS IF VERIFICATION FAILS
    }

    // PASS THE REQUEST OBJECT TO THE NEXT ENDPOINT IN THE MIDDLEWARE CHAIN
    return req;
  },

  // FUNCTION TO GENERATE AND SIGN A NEW JWT TOKEN BASED ON USER DATA
  signToken: function ({ username, email, _id }) {
    // CREATE A PAYLOAD CONTAINING USER INFORMATION TO BE ENCODED IN THE TOKEN
    const payload = { username, email, _id };

    // SIGN THE PAYLOAD WITH SECRET AND SET THE EXPIRATION TIME
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
