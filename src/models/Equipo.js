const { Schema, model } = require("mongoose")

const tematicaSchema = new Schema({
    Pos: Number,
    nombre: String,
    img: String,
    PJ: Number,
    G: Number,
    E: Number,
    P: Number,
    GF: Number,
    GC: Number,
    DG: Number,
    Pts: Number,
})

module.exports = model("Equipo", tematicaSchema)
