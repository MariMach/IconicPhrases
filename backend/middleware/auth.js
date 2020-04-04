const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  //const token = req.header("x-auth-token");
  // token as a query parameter
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).send("Access denied. No token provided");
    }
    // const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    // const decoded = jwt.verify(token, "thisisthesecretshouldbelonger");
    // req.user = decoded;
    const decoded = jwt.verify(token, "thisisthesecretshouldbelonger");
    req.userData = { email: decoded.email, userId: decoded.userId };
    next();
  } catch (error) {
    return res.status(401).json({ message: "You are not authenticated!" });
  }
};
