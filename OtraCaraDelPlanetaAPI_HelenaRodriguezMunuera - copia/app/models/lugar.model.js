module.exports = mongoose => {
    var lugarSchema = new mongoose.Schema(
      {
        Localizacion: [{
            id: {
                type: mongoose.Schema.ObjectId,
                ref: 'localizaciones',
                required: [ true, 'Tiene que poner la id de la lozalizacion' ]
            }
        }],
        TipoLugar : [{
            id: {
                type: mongoose.Schema.ObjectId,
                ref: 'tipolugares'
            },
        }],
        coordenadas: String,
        nombre: String,
        descripcion: String

      },
      { timestamps: true }
    );
  
    lugarSchema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Lugar = mongoose.model('lugares', lugarSchema);
    return Lugar;
  };