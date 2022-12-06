module.exports = mongoose => {
    var localizacionSchema = new mongoose.Schema(
      {
        coordenadas: String,
        nombre: String
      },
      { timestamps: true }
    );
  
    localizacionSchema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Localizacion = mongoose.model('localizaciones', localizacionSchema);
    return Localizacion;
  };