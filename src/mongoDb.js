const mongoose = require("mongoose")

const conectarDB = async () => {
    await mongoose
        .connect(process.env.URI || "")
        .then(() => {
            console.log("Conectado a la base de datos")
        })
        .catch((err) => {
            console.error(err)
        })
}
const desconectarDB = () => {
    mongoose.connection.close()
}
module.exports = { conectarDB, desconectarDB }
