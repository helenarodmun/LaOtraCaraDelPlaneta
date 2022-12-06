module.exports = mongoose => {
    var eventoSchema = new mongoose.Schema(
      {
        Lugar: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'lugares'
          }],
        TipoActividad :  [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'tipoactividades'
          }],
        nombre: String,
        direccion: String,
        contacto: String,
        fecha: Date,
        horario: String,
        reserva: Boolean,
        precio: String,
        descripcion: String

      },
      { timestamps: true }
    );
  
    eventoSchema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Evento = mongoose.model('eventos', eventoSchema);
    return Evento;
  };