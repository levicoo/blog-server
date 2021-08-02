const mongoose = require('mongoose')


const menuSchema = mongoose.Schema({
    "title": String,
    "path": String,
    "sequence": Number,
})

module.exports = mongoose.model("menus", menuSchema, "menus")