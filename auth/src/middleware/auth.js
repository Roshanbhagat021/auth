const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  jwt.verify(token, process.env.SECRET, (err, result) => {
    if (err) {
      console.log("error: ", err);
      res.status(500).send("Token is not valid");
    } else {
      req.user = result;
      next();
    }
  });
};

module.exports = auth;
