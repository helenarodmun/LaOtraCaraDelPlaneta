module.exports = app => {
    const tipoactividades = require("../controllers/tipoActividad.controller.js");
  
    var router = require("express").Router();
  
    // Crear nueva actividad
    router.post("/nuevo", tipoactividades.create);
  
    // Devuelve todos los usuarios
    router.get("/", tipoactividades.findAll);
  
   // Devuleve un usuario a traves de la id
    router.get("/busca/:nombre", tipoactividades.findOne);
  
    // Modificar un usuario a traves de la id
    router.put("/modifica/:nombre", tipoactividades.update);
  
    // Borrar un usuario a traves de la id
    router.delete("/borra/:nombre", tipoactividades.delete);
  
    // Crear un nuevo usuario
    router.delete("/borrarTodo", tipoactividades.deleteAll);
  
    app.use('/tipoActividades', router);
  };