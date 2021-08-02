const mongoose = require('mongoose')

const articleSchema = mongoose.Schema({
    "name": String,
    "className": String,
    "uploadTime": String,
    "sequence": Number,
    "content": String,
    "uploadTime": String,
    "createTime": String,
    "frontpage": Boolean,
    "guide": String,
    "tag": Array
})

module.exports = mongoose.model("articles", articleSchema, "articles")