'use strict'

//Cargar el modulo mongoose
var mongoose = require('mongoose');
//Cargar el modulo app que hemos creado con la configuracion de BodyParser y Express
var app = require('./app');
//Indicar el puerto que va a tener el servidor para escuchar
var port = 3700

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/portafolio')
                .then(() => {
                            console.log("Conexion a la base datos establecida con exito...");
    
                            //Creacion del servidor
                            app.listen(port, () => {
                               console.log('Servidor corriendo correctamente en la URL: localhost:3700'); 
                            });
                            
                })
                .catch(err => console.log(err));
				


