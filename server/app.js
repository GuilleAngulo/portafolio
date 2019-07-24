'use strict'

//El metodo require carga el modulo, el cual busca en la carpeta modules de NodeJS
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//Cargar archivos de rutas
var project_routes = require('./routes/project');
var contact_routes = require('./routes/contact');

//MIDDLEWARES - Se ejecutan antes de la funcionalidad final del servidor
//Configuracion necesaria para bodyParser
app.use(bodyParser.urlencoded({extended:false}));

//Convertir cualquier peticion a JSON, con el metodo de Body Parser
app.use(bodyParser.json());

//CORS
//Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//Se cargan las rutas en la app
app.use('/api', project_routes);
app.use('/api', contact_routes);

module.exports = app; 

 