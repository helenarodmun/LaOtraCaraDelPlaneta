module.exports = mongoose => {
    var actividadSchema = new mongoose.Schema(
      {
        Lugar: [{
          id: {
              type: mongoose.Schema.ObjectId,
              ref: 'Lugar'
          }
      }],
      TipoActividad : [{
          id: {
              type: mongoose.Schema.ObjectId,
              ref: 'tipoActividad'
          },
      }],
        nombre: String,
        direccion: String,
        telf: String,
        dias: String,
        horario: String,
        reserva: Boolean,
        precio: String,
        descripcion: String

      },
      { collection: 'actividades' }
    );
  
    actividadSchema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Actividad = mongoose.model('actividades', actividadSchema);
    return Actividad;
  };