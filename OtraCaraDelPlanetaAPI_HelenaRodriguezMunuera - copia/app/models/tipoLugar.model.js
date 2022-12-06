module.exports = mongoose => {
    var tipoLugarSchema = new mongoose.Schema(
      {
        nombre: String
      },
      { timestamps: true }
    );
  
    tipoLugarSchema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const TipoLugar = mongoose.model('tipolugares', tipoLugarSchema);
    return TipoLugar;
  };