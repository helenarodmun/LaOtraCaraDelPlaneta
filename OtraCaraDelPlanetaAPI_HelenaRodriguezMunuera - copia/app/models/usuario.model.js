module.exports = mongoose => {
  var usuarioSchema = new mongoose.Schema(
    {
      nombre: String,
      contraseña: String
    },
    { timestamps: true }
  );

  usuarioSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Usuario = mongoose.model('usuarios', usuarioSchema);
  return Usuario;
};