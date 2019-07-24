'use strict';

var nodemailer = require('nodemailer');
var Contact = require("../models/contact");
var Global = require("../global");

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
            user: Global.gmail,
            pass: Global.password
          }
        });
        

        var mailOptions = {
          from: contact.getName(),
          to: Global.gmail,
          subject: 'Nuevo Mensaje [Portafolio] | ' + contact.getSubject(),
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