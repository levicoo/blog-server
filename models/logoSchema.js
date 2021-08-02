const mongoose = require('mongoose')

const logoSchema = mongoose.Schema({
    "content": String,
    "uploadTime": String
})

module.exports = mongoose.model("logoTitle", logoSchema, "logoTitle")