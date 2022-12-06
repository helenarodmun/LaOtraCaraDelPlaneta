const express = require("express");
const cors = require("cors");

const app = express();
const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("¡Conectado a la base de datos!");
  })
  .catch(err => {
    console.log("¡Error al conectar a la base de datos!", err);
    process.exit();
  });
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// analizar las solicitudes de tipo de contenido - application/json
app.use(express.json());

// analizar las solicitudes de tipo de contenido - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// ruta simple
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a la Otra cara del Planeta APIRestful" });
});



require("./app/routes/usuario.routes.js")(app);
require("./app/routes/actividades.routes.js")(app);
require("./app/routes/localizaciones.routes.js")(app);
require("./app/routes/lugares.routes.js")(app);
require("./app/routes/tipoLugares.routes.js")(app);
require("./app/routes/eventos.routes.js")(app);
require("./app/routes/tipoActividades.routes.js")(app);
// establecer el puerto, escuchar las peticiones
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
