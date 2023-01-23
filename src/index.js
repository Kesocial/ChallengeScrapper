const express = require("express")
const exphbs = require("express-handlebars")
const handlebars = require("handlebars")
const path = require("path")
const { conectarDB } = require("./mongoDb")
require("dotenv").config()
const { realizarPeticion } = require("./utils/scraping")
const {
    allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access")
const Equipo = require("./models/Equipo")
//Crear app
conectarDB()
const app = express()

//Configuracion
app.set("port", process.env.PORT || 8888)
app.set("views", path.join(__dirname, "/views"))
const hbs = exphbs.create({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    handlebars: allowInsecurePrototypeAccess(handlebars),
})
app.engine(".hbs", hbs.engine)
app.set("view engine", "hbs")

//Ruta
app.get("/", async (req, res) => {
    const equipos = await Equipo.find({}).sort({Pos:1})
    res.render("index", { equipos })
})

//Carpeta public
app.use(express.static(path.join(__dirname, "public")))

//Conexion
app.listen(app.get("port"), () =>
    console.log("Server running on port ", app.get("port"))
)
console.log("Tiempo entre cada scrapping " + process.env.INTERVAL)
setInterval(realizarPeticion, process.env.INTERVAL )
