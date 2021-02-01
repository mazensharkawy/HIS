const jwt = require("jsonwebtoken");

export function verifyTokenMiddleware(req, res, next) {
  // Get auth header value
  const token = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof token !== "undefined") {
    // Set the token
    req.token = token;
    // Next middleware
    verifyTokenValid(req.token, (valid) => {
      if (!valid.success)
        res.status(403).send({
          success: false,
          token: false,
          err: "token not valid",
        });
      else next();
    });
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

function verifyTokenValid(token, cb) {
  jwt.verify(token, SECRET_KEY, (err, data) => {
    if (err) cb({ success: false });
    else cb({ success: true });
  });
}
