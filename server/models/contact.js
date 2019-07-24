'use strict';

var Contact = function(name, email, subject, message) {
    this.name = name || null;
    this.email = email || null;
    this.subject = subject || null;
    this.message = message || null;
}

Contact.prototype.getName = function() {
    return this.name;
}

Contact.prototype.setName = function(name) {
    this.name = name;
}


Contact.prototype.getEmail = function() {
    return this.email;
}

Contact.prototype.setEmail = function(email) {
    this.email = email;
}


Contact.prototype.getSubject = function() {
    return this.subject;
}

Contact.prototype.setSubject = function(subject) {
    this.subject = subject;
}


Contact.prototype.getMessage = function() {
    return this.message;
}

Contact.prototype.setMessage = function(message) {
    this.message = message;
}


module.exports = Contact;