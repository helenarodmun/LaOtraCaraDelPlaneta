const { lugares } = require("../models");
const db = require("../models");
const Actividad = db.actividades;



// Crear y guardar un nuevo actividad
exports.create = (req, res) => {
  // Validar la petición
  if (!req.body.nombre) {
    res.status(400).send({ message: "¡El contenido no puede estar vacío!" });
    return;
  }

  // Crear actividad
  const actividad = new Actividad({
    lugar: req.body.id,
    tipoActividad: req.body.id,
    nombre: req.body.nombre,
    direccion: req.body.direccion,
    contacto: req.body.contacto,
    dias: req.body.dias,
    horario: req.body.horario,
    reserva: req.body.reserva,
    precio: req.body.precio,
    descripcion: req.body.descripcion
  });

  // Guardar actividad
  actividad
    .save(actividad)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ha ocurrido un error mientras intentaba crear la actividad."
      });
    });
};

// Devolver todas las actividades de la base de datos
exports.findAll = (req, res) => {

  const nombre = req.query.nombre;
  var condition = nombre ? { nombre: { $regex: new RegExp(nombre), $options: "i" } } : {};

  Actividad.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Se ha producido un error al recuperar las actividades."
      });
    });
};

// Buscar una actividado por el nombre
exports.findOne = (req, res) => {

  const nombre = req.params.nombre;
  var condition = nombre ? { nombre: { $regex: new RegExp(nombre), $options: "i" } } : {};

  Actividad.findOne(condition)
    .then(data => {
      
      if (!data)
        res.status(404).send({ message: "No se ha encontrado la actividad con el nombre" + nombre });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error al recuperar la actividad con el nombre= " + nombre });
    });
  
};

// Buscar una actividado por el tipo de actividad relacionando las colecciones por el id
exports.find = (req, res) => {

  let id = [
    {
        "_id": "638f573ea4784b88f1f1075c"
    }
];
//Tipo "Escape Room"
  Actividad.find({
    where: {
      TipoActividad : id
    }})
    .then(data => {
      
      if (!data)
        res.status(404).send({ message: "No se ha encontrado la actividad con el nombre" + nombre });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error al recuperar la actividad con el nombre= " + nombre });
    });
  
};

// Modificar una actividad, recuperandola por el nombre
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "¡Los datos a actualizar no pueden estar vacíos!"
    });
  }

  const nombre = req.params.nombre;
  var condition = nombre ? { nombre: { $regex: new RegExp(nombre), $options: "i" } } : {};

  Actividad.updateOne(condition, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `No se puede actualizar la actividad con nombre=${nombre}. ¡Tal vez no se encontró el usuario!`
        });
      } else res.send({ message: "La actividad se ha actualizado con éxito." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al actualizar la actividad con nombre=" + nombre
      });
    });
};

// Borrar una actividad, recuperándola por el nombre

exports.delete = (req, res) => {
  const nombre = req.params.nombre;
  var condition = nombre ? { nombre: { $regex: new RegExp(nombre), $options: "i" } } : {};

  Actividad.findOneAndRemove(condition)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `No se ha podido eliminar la actividad con nombre=${nombre}. ¡Tal vez no se encontró!`
        });
      } else {
        res.send({
          message: "¡Actvidad eliminado con éxito!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se puede borrar la actividad con nombre=" + nombre
      });
    });
};

// Borrar todas las avctividades de la base de datos
exports.deleteAll = (req, res) => {
  Actividad.deleteMany({})
    .then(data => {
      res.send({
        message: ` ¡Las actividades se han eliminado correctamente!, en total se borraron ${data.deletedCount}`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al eliminar las actividades."
      });
    });
};


