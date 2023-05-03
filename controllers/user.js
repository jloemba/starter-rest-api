const User = require("../models").User;
var jwt = require("jsonwebtoken");

module.exports = {
  register: function (req, res, next) {
    try {
      if (req.body.email) {
        User.findOne({ where: { email: req.body.email } }).then((result) => {
          console.log(result);
          if (result) res.status(409).json({message:"existe déjà"});
          else {
            const { email } = req.body;
            User.create({ email: email, isAdmin: false }).then(
              (createdUser) => {
                res.status(201).json(createdUser);
              }
            );
          }
        });
      } else res.status(402).json("Payload 'email' for a user creation");
    } catch (error) {
      res.status(error.response.status);
      return res.send(error.message);
    }
  },
  isUserExistByEmail: function (req, res, next) {
    try {
      if (req.query.email) {
        User.findOne({ where: { email: req.query.email } }).then(
          (foundUser) => {
            if (foundUser) {
              const { id, email } = foundUser;
              const token = jwt.sign(
                { user_id: id, email },
                process.env.TOKEN_KEY,
                {
                  expiresIn: "30d",
                }
              );

              foundUser.token = token;
              res.status(200).json(foundUser);
            } else res.status(200).json(false);
          }
        );
      } else res.status(402).json("Payload 'email' for a user checking");
    } catch (error) {
      res.status(error.response.status);
      return res.send(error.message);
    }
  },
};
