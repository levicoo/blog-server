const mongoose = require('mongoose')

const bannerSchema = mongoose.Schema({
    "title": String,
    "imgUrl": String,
    "uploadTime": String,
    "createTime": String,
    "sequence": Number
})

module.exports = mongoose.model("banner", bannerSchema, "banner")