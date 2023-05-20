var jwt = require("jsonwebtoken");
const User = require("../models").User;

function verifyToken(req, res, next) {
  var token = req.headers["x-access-token"];
  if (!token)
    return res.status(403).send({ auth: false, message: "No token provided." });
  jwt.verify(token, process.env.TOKEN_KEY, function (err, decoded) {
    if (decoded) {
      User.findOne({ where: { email: decoded.email } }).then((foundUser) => {
        if (!foundUser.isActived)
          return res
            .status(500)
            .send({ auth: false, message: "Your account is not activated" });
      });
    } else return res.status(403).send({ auth: false, message: "Expired session" });
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyToken;
