/**
 * 数据库连接
 * 
 */


const mongoose = require('mongoose')

const URL = 'mongodb://127.0.0.1:27017/blog'
const log4js = require('./../utils/log4j')
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


const db = mongoose.connection
db.on('error', () => {
    log4js.error('**数据库连接失败**');
})
db.on('open', () => {
    log4js.info('**数据库连接成功**');
})