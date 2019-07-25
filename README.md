# Personal Portafolio

This is a Personal Portafolio MEAN Stack application. The menu is composed by: "Sobre Mi" (About Me), "Proyectos (Projects)", "Crear Proyecto" (Create Project) and "Contacto" (Contact).
In the "About Me" section there is a personal introduction template. In "Projects" are displayed th projects stored at the MongoDB, where you can delete or edit its properties. 
In "Create Project" there is a form to create a new project, allowing to attach one picture to it. Finally in "Contact" section you can fill a form which will create and send an email.

## Getting Started

Install MongoDB and check that the port is the default: 27017. The table will create automatically when running the application. Also is required to have NodeJS installed, as well as npm.


### Prerequisites

The libraries used are need to be installed in client side: Jquery, Toastr (For message animation when sending a contact form) and RXJS

```
cd client/
npm install jquery --save
npm install ngx-toastr --save
npm install rxjs --save
```

The libraries used are need to be installed in server side: Body-Parser, Connect-Multiparty, Express, Mongoose and Nodemailer (Send Emails)

```
cd server/
npm install body-parser --save
npm install connect-multiparty --save
npm install express --save
npm install mongoose --save
npm install nodemailer --save
```

### Installing

It is necessary to fill the file in '/server/util/global.js' with your email data. Also it´s necessary to allow to Gmail Account access from Low Secure Apps. Otherwise the configuration for another email account can be edited at '/server/controllers/contact.js', in "transporter" variable (See https://nodemailer.com/about/).


Start running the API server 

```
cd /server/
npm start
```

And the client

```
cd /client/
ng serve
```


## Built With

* [MongDB](https://www.mongodb.com/) - The database used
* [Express](https://expressjs.com/en/guide/routing.html) - Web framework
* [AngularJS](https://angularjs.org/) - Javascript client side framework
* [NodeJS](https://nodejs.org/en/) -  The server-side JavaScript runtime environmen

## Authors

* **Guillermo Angulo**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* This project started as a continuation to an Udemy Course Project (https://www.udemy.com/master-en-javascript-aprender-js-jquery-angular-nodejs-y-mas/learn/lecture/10151384?start=180#overview)
