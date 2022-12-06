const db = require("../models");
const Usuario = db.usuarios;

// Crear y guardar un nuevo usuario
exports.create = (req, res) => {
  // Validar la petición
  if (!req.body.nombre) {
    res.status(400).send({ message: "¡El contenido no puede estar vacío!" });
    return;
  }

  // Crear usuario
  const usuario = new Usuario({
    nombre: req.body.nombre,
    contraseña: req.body.contraseña
  });

  // Guardar usuario
  usuario
    .save(usuario)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ha ocurrido un error mientras intentaba crear el usuario."
      });
    });
};

// Devolver todos los usuarios de la base de datos
exports.findAll = (req, res) => {
  
  const nombre = req.query.nombre;
  var condition = nombre ? { nombre: { $regex: new RegExp(nombre), $options: "i" } } : {};

  Usuario.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Se ha producido un error al recuperar los usuarios."
      });
    });
};

// Buscar un usuario por el nombre
exports.findOne = (req, res) => {

  const nombre = req.params.nombre;
  var condition = nombre ? { nombre: { $regex: new RegExp(nombre), $options: "i" } } : {};

  Usuario.findOne(condition)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "No se ha encontrado un usuario con el nombre" + nombre });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error al recuperar al usuario con el nombre= " + nombre });
    });
};

// Modificar un usuario, recuperandolo por la id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "¡Los datos a actualizar no pueden estar vacíos!"
    });
  }

  const id = req.params.id;
  
  Usuario.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `No se puede actualizar el usuario con id=${id}. ¡Tal vez no se encontró el usuario!`
        });
      } else res.send({ message: "El usuario se ha actualizado con éxito." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al actualizar el usuario con nid=" + id
      });
    });
};

// Borrar un usuario, recuperándolo por la id
exports.delete = (req, res) => {
  const id = req.params.id;
  
  Usuario.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `No se ha podido eliminar al usuario con id=${id}. ¡Tal vez no se encontró el usuario!`
        });
      } else {
        res.send({
          message: "¡Usuario eliminado con éxito!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se puede borrar el usuario con  id=" + id
      });
    });
};

// Borrar todos los usuarios de la base de datos
exports.deleteAll = (req, res) => {
  Usuario.deleteMany({})
    .then(data => {
      res.send({
        message: ` ¡Los usuarios se han eliminado correctamente!, en total se borraron ${data.deletedCount}`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al eliminar los usuarios."
      });
    });
};


