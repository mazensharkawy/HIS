const jwt = require("jsonwebtoken")
const {privateKey} = require("../keys")
module.exports = function(req, res, next) {
  let token = req.header("Authorization")
  if (!token) {
    req.User = null
    next()
    return
  }

  // example for header Authorization bearer .....JWT.......;
  token = token.split(" ").pop()
  jwt.verify(token, privateKey, function(err, decoded) {
    if(err) {
      return res.status(401).send("Access Denied")
    }
    req.User = decoded
    next()
  })
};
