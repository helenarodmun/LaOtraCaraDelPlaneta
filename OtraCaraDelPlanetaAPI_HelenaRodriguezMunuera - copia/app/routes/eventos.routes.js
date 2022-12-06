module.exports = app => {
    const eventos = require("../controllers/evento.controller.js");
  
    var router = require("express").Router();
  
    // Crear nueva evento
    router.post("/nuevo", eventos.create);
  
    // Devuelve todos los usuarios
    router.get("/", eventos.findAll);
  
   // Devuleve un usuario a traves de la id
    router.get("/busca/:nombre", eventos.findOne);
  
    // Modificar un usuario a traves de la id
    router.put("/modifica/:nombre", eventos.update);
  
    // Borrar un usuario a traves de la id
    router.delete("/borra/:nombre", eventos.delete);
  
    // Crear un nuevo usuario
    router.delete("/borrarTodo", eventos.deleteAll);
  
    app.use('/eventos', router);
  };