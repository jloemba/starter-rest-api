const User = require("../models").User;
var jwt = require("jsonwebtoken");
const { notifyAfterRegistration } = require("../services/mailer");

module.exports = {
  register: function (req, res, next) {
    try {
      if (req.body.email) {
        User.findOne({ where: { email: req.body.email } }).then((result) => {
          if (result) res.status(409).json({ message: "existe déjà" });
          else {
            let { email } = req.body;
            User.create({
              email: email,
              isAdmin: false,
              isActived: false,
            }).then((createdUser) => {
              res.status(201).json(createdUser);
            });
            User.findAll({
              where: { isActived: true, levelAccess: "Administrateur" },
              attributes: ["email"],
            }).then((adminUsers) => {
              let adminUserList = [];
              adminUsers.forEach((element) => {
                adminUserList.push(element.dataValues.email);
              });
              notifyAfterRegistration(email, adminUserList);
            });
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
  enableOrDisableUserAccount: function (req, res, next) {
    try {
      User.findOne({ where: { id: req.body.userId } }).then((foundUser) => {
        if (foundUser) {
          foundUser.update({ isActived: req.body.actived }).then((response) => {
            res.status(200).json({
              message: req.body.actived
                ? "Account well actived !!!"
                : "Account well deactivated",
            });
            User.findAll({
              where: { isActived: true, levelAccess: "Administrateur" },
              attributes: ["email"],
            }).then((adminUsers) => {
              notifyRegistration(foundUser.email, adminUsers);
            });
          });
        } else res.status(404).json({ message: "User not found" });
      });
    } catch (error) {
      res.status(error.response.status);
      return res.send(error.message);
    }
  },
  allUser: function (req, res, next) {
    try {
      User.findAll({
        attributes: [
          "createdAt",
          "email",
          "id",
          "isActived",
          "isAdmin",
          "updatedAt",
          "name",
          "levelAccess",
        ],
      }).then((response) => {
        res.status(200).json(response);
      });
    } catch (error) {
      res.status(error.response.status);
      return res.send(error.message);
    }
  },
  deactivedAccount: function (req, res, next) {
    try {
      User.findAll({
        where: {
          isActived: [false, null],
        },
        attributes: [
          "createdAt",
          "email",
          "id",
          "isActived",
          "isAdmin",
          "updatedAt",
          "name",
          "levelAccess",
        ],
      }).then((response) => {
        console.log(response);
        res.status(200).json(response);
      });
    } catch (error) {
      res.status(error.response.status);
      return res.send(error.message);
    }
  },
};
