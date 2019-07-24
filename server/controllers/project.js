'use strict'

var Project = require("../models/project");
var fs = require('fs');
var path = require('path');


//Se carga el modulo de sockets, indicando el servidor en el que va a estar escuchando con http
var app = require('../app');
var server = app.server;
var io = app.io;


var controller = {
  home: function(req, res){
      return res.status(200).send({
         message: 'Soy la home' 
      });
      
  },

  test: function(req, res){
      return res.status(200).send({
          message: 'Soy el test del controlador'
      });
      
  }, 
    
  //GUARDAR PROYECTO  
  saveProject: function(req, res){
    var project = new Project();
    
    var params = req.body;
    
    project.name = params.name;
    project.description = params.description;
    project.category = params.category;
    project.year = params.year;
    project.langs = params.langs;
    project.image = null;
      
      
    project.save((err, projectStored) => {
       if(err) return res.status(500).send({message: "Error al guardar el documento."});
        
       if(!projectStored) return res.status(404).send({message: "No se ha podido guardar el projecto."});
        
       return res.status(200).send({project: projectStored, message: 'Metodo save project'});
      
    });
      
      
      /*Mensaje si el status es correcto
      return res.status(200).send({
        project: project,
        message: 'Metodo save project'
    })*/
  },
    
    //DEVOLVER UN PROYECTO
    getProject: function(req, res){
        var projectId = req.params.id;
        
        if(projectId == null) return res.status(404).send({message: "El proyecto no existe."});
        
        Project.findById(projectId, (err, project) => {
            
            if(err) return res.status(500).send({message: "Error al devolver los datos."});
            
            if(!project) return res.status(404).send({message: "El proyecto no existe."});
            
            
            return res.status(200).send({
                project: project
            });
        });

    },
    
    //DEVOLVER TODOS LOS PROYECTOS
    getProjects: function(req, res){
       
        //Se le pueden pasar por parametro filtros "where"
        //El metodo sort los ordena, por defecto van ordenados en ascendiente pero si se coloca un "-" van en descendiente
        Project.find({}).sort('year').exec((err, projects) => {
            
            if(err) return res.status(500).send({message: "Error al devolver los datos"});
            
            if(!projects) return res.status(404).send({message: "No hay proyectos para mostrar"});
            
            return res.status(200).send({projects});
        });
    },
    
    
    updateProject: function(req, res){
        
        var projectId = req.params.id;
        var update = req.body;
        
        //Parametros: 1)El ID, 2)Los nuevos parametros del proyecto, 3)Que responda con el nuevo proyecto, 4) Funcion callback
        Project.findByIdAndUpdate(projectId, update, {new:true}, (err, projectUpdated) => {
           if(err) return res.status(500).send({message: "Error al actualizar."});
           if(!projectUpdated) return res.status(404).send({message: "No existe el proyecto para actualizar."});
            
            return res.status(200).send({
                project: projectUpdated
            });
        });
    },
    
    
    deleteProject: function(req, res){
        
        var projectId = req.params.id;
        
        Project.findByIdAndRemove(projectId, (err, projectRemoved) => {
           if(err) return res.status(500).send({message: "No se ha podido borrar el proyecto."});
            
           if(!projectRemoved) return res.status(404).send({message: "No se puede eliminar ese proyecto."});
            
           return res.status(200).send({
               project: projectRemoved                         
           })  
        });
        
        
    },
    
    
    uploadImage: function(req, res) {
        
        var projectId = req.params.id;
        var fileName = 'Imagen no subida...';
        
        //Solo entrara si se sube la imagen correctamente y se crea la propiedad "files" de la req
        if(req.files){
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];
            
            var extensionSplit = fileName.split("\.");
            var fileExt = extensionSplit[1];
            
            //Controlar que sea una imagen lo que se esta subiendo, mediante el control de la extension del archivo
            if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif') {
            
            Project.findByIdAndUpdate(projectId, {image: fileName}, {new:true}, (err, projectUpdated) => {
            
                    if(err) return res.status(500).send({message: 'La imagen no se ha subido.'});
                    if(!projectUpdated) return res.status(404).send({message: 'El proyecto no existe.'});
                
                    return res.status(200).send({
                        project: projectUpdated
                    });  
                });
            } 
            //Si no es una imagen, borrar el archivo del servidor
            else {
                //Libreria de Node Filesystem, con el metodo Unlink
                fs.unlink(filePath, (err) => {
                    return res.status(200).send({message: 'Extensión no es válida.'});
                }); 
            }
            
        }else {
            return res.status(404).send({
                message: fileName
            });
        }
        
        
    },
    
    getImageFile: function(req, res){
        var file = req.params.image;
        var path_file = './uploads/' + file;
        
        fs.exists(path_file, (exists) => {
            if(exists){
                return res.sendFile(path.resolve(path_file));
            }else {
                return res.status(200).send({
                    message: 'No existe la imagen'
                });
            } 
        });
    },
    
    
    chat: function(req, res){
        //return res.status(200).send("CHAT funcionando");
        io.on('connection', function(socket){
         return res.status(200).send("El cliente con IP: "+socket.handshake.address+" se ha conectado");
      }); 
  }
    
    
};

module.exports = controller;