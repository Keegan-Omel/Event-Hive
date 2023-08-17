const jwt = require("jsonwebtoken");

const secret = "mysecretsshhhhh";
const expiration = "2h";

const authMiddleware = (req, res, next) => {
  let token = req.body.token || req.query.token || req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split(" ").pop().trim();
  }

  if (!token) {
    return next(); // Call next to continue middleware chain
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data;
    next(); // Call next to continue middleware chain
  } catch (error) {
    console.log("Invalid token:", error.message);
    next(); // Call next to continue middleware chain
  }
};


const generateToken = ({ email, username, _id }) => {
  const payload = { email, username, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

module.exports = { authMiddleware, generateToken };

// checkPoint!!!!
