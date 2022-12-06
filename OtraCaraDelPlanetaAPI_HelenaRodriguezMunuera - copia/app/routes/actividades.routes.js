module.exports = app => {
    const actividades = require("../controllers/actividad.controller.js");
  
    var router = require("express").Router();
  
    // Crear nueva actividad
    router.post("/nuevo", actividades.create);
  
    // Devuelve todos los usuarios
    router.get("/", actividades.findAll);
  
   // Devuleve un usuario a traves de la id
    router.get("/busca/:nombre", actividades.findOne);

    //devuelve actividades por tipo
    router.get("/buscaEscapeRoom", actividades.find);
    
    // Modificar un usuario a traves de la id
    router.put("/modifica/:nombre", actividades.update);
  
    // Borrar un usuario a traves de la id
    router.delete("/borra/:nombre", actividades.delete);
  
    // Crear un nuevo usuario
    router.delete("/borrarTodo", actividades.deleteAll);
  
    app.use('/actividades', router);
  };