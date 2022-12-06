module.exports = app => {
    const tipolugares = require("../controllers/tipoLugar.controller.js");
  
    var router = require("express").Router();
  
    // Crear nueva actividad
    router.post("/nuevo", tipolugares.create);
  
    // Devuelve todos los usuarios
    router.get("/", tipolugares.findAll);
  
   // Devuleve un usuario a traves de la id
    router.get("/busca/:nombre", tipolugares.findOne);
  
    // Modificar un usuario a traves de la id
    router.put("/modifica/:nombre", tipolugares.update);
  
    // Borrar un usuario a traves de la id
    router.delete("/borra/:nombre", tipolugares.delete);
  
    // Crear un nuevo usuario
    router.delete("/borrarTodo", tipolugares.deleteAll);
  
    app.use('/tipoLugares', router);
  };