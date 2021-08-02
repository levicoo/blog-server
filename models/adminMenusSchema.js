const mongoose = require('mongoose')


const adminMenuSchema = mongoose.Schema({
    "menuName": String,
})

module.exports = mongoose.model("admin", adminMenuSchema, "admin")