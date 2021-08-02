const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    "userName": String,
    "userPwd": String,
    "uploadTime": String
})

module.exports = mongoose.model("users", userSchema, "users")