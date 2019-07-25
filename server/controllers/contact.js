'use strict';

var nodemailer = require('nodemailer');
var Contact = require("../models/contact");
const global = require("../util/global");

var controller = {
  sendEmail: function(req, res){
      
        var params = req.body;
      
        var contact = new Contact(
            params.Name,
            params.Email,
            params.Subject,
            params.Message
        );
      
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: global.gmail,
            pass: global.password
          }
        });
        

        var mailOptions = {
          from: '"Web Portafolio" <admin@portafolio.com>',
          to: global.gmail,
          subject: 'Nuevo Mensaje | ' + contact.getSubject(),
          html: '<p><strong>' + contact.getMessage() + '</strong></p>' +
                '<p><i>Enviado por: ' + contact.getName() + ' (' + contact.getEmail() + ')</i></p>'
        };

        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            return res.status(500).send({message: 'Error enviando el email..' });
          } else {
            return res.status(200).send({message: 'Email enviado: ' + info.response });
          }
        });        
  }
}
     
module.exports = controller;