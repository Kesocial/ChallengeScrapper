const rp = require("request-promise")
const cheerio = require("cheerio")
const Equipo = require("../models/Equipo")

const realizarPeticion = async () => {
    const $ = await rp({
        uri: "https://www.futbolargentino.com/primera-division/tabla-de-posiciones",
        transform: function (body) {
            return cheerio.load(body)
        },
    })
    const table = $("#p_score_contenido_TorneoTabs_collapse3 table")
    const columns = []
    const equipos = []
    table.find("th").each((i, row) => {
        columns.push($(row).html())
    })
    let auxIterator = 0
    let equipo = {}

    table.find("tbody td").each(async (i, td) => {
        if ($(td).find("span").html() !== null) {
            equipo.nombre = $(td).find("span").html()
            equipo.img = $(td).find("img").attr("data-src")
        } else equipo[columns[auxIterator]] = $(td).html()
        auxIterator++
        if (!(auxIterator < columns.length)) {
            equipos.push(equipo)
            auxIterator = 0
            equipo = {}
            equipo[columns[auxIterator]] = $(td).html()
        }
    })
    equipos.forEach(
        async (e) =>
            await Equipo.findOneAndUpdate({ nombre: e.nombre }, e, {
                upsert: true,
            })
    )
}
module.exports = { realizarPeticion }
