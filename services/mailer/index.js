var nodemailer = require("nodemailer");
const express = require("express");
const hbs = require("nodemailer-handlebars");
const path = require("path");

//const path = require('path');
const dotenv = require("dotenv");

// Résoudre le chemin absolu du fichier .env en utilisant __dirname
const envPath = path.resolve(__dirname, "../../.env");

// Charger les variables d'environnement à partir du fichier .env
//const result = dotenv.config({ path: envPath });

const viewPath = path.resolve(__dirname, "./templates/views/");
const partialsPath = path.resolve(__dirname, "./templates/partials");

let transporter = nodemailer.createTransport({
  host: process.env.HOSTMAIL,
  port: process.env.PORTSMTP,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.MAILADDRESS, // generated ethereal user
    pass: process.env.GOOGLE_APP_PASSWORD, // generated ethereal password
  },
});

transporter.use(
  "compile",
  hbs({
    viewEngine: {
      extName: ".handlebars",
      layoutsDir: viewPath,
      defaultLayout: false,
      partialsDir: partialsPath,
      express,
    },
    viewPath: viewPath,
    extName: ".handlebars",
  })
);

function notifyAfterRegistration(emailUser, mailingList) {
  let mailContext = {
    email_user: emailUser,
    client_url: process.env.CLIENT_CALL + "/administration"
  };

  var mailOptions = {
    from: process.env.MAILADDRESS,
    to: mailingList,
    subject: "Le Registre | Compte à valider",
    template: "registration",
    context:mailContext,
    headers: {
      "x-priority": "5",
      "x-msmail-priority": "High",
      importance: "high",
    },
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log("Erreur :" + err);
    } else {
      console.log("Info :" + info);
    }
  });
}

module.exports = {
  notifyAfterRegistration,
};
