const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')

const path = require('path')
const koaBody = require('koa-body');
const fs = require("fs")
const getUploadDirName = require('./utils/getUploadDirname')


const logger = require('koa-logger')
const log4js = require('./utils/log4j')
const koajwt = require('koa-jwt')
const router = require('koa-router')()
const index = require('./routes/index')
const users = require('./routes/users')
const menus = require('./routes/menus')
const banners = require('./routes/banners')
const upload = require('./routes/upload')
const admin = require('./routes/admin')
const articles = require('./routes/articles')
const cors = require('@koa/cors');
const util = require('./utils/util')

const koaStatic = require('koa-static')


// error handler
onerror(app)
// 引入数据库
require('./db/db')
// middlewares
app.use(cors());
app.use(json())
app.use(logger())
app.use(koaStatic(path.join(__dirname), 'public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

app.use(koaBody({
  multipart: true,
  formidable: {
    keepExtensions: true,
    maxFieldsSize: 2 * 1024 * 1024,
    uploadDir: path.join(__dirname, `public/upload/${getUploadDirName()}`),
    onFileBegin: (name, file) => {   //文件保存之前的预处理
      let res = file.path
      res = (res.split(getUploadDirName())[0] + getUploadDirName() + '/')
      var myDate = new Date();
      if (!fs.existsSync(res)) {
        fs.mkdirSync(res);
      }
      file.path = res + myDate.getTime() + '.' + file.name.split('.').slice(-1)//保存文件名改为源文件的文件名，否则文件名随机
      console.log(file.path)


    }
  }
}));


// logger
app.use(async (ctx, next) => {
  log4js.info(`get params:${JSON.stringify(ctx.request.query)}`)
  log4js.info(`post params:${JSON.stringify(ctx.request.body)}`)
  await next().catch((err) => {
    if (err.status == '401') {
      ctx.status = 200;
      ctx.body = util.fail('Token认证失败', util.CODE.AUTH_ERROR)
    } else {
      throw err;
    }
  })
})



// token 认证
// app.use(koajwt({ secret: 'levi' }).unless({
//   path: [/^\/api\/users\/login\/#/]
// }))

// routes
router.prefix("/api")
router.use(index.routes(), index.allowedMethods())
router.use(users.routes(), users.allowedMethods())
router.use(menus.routes(), menus.allowedMethods())
router.use(upload.routes(), upload.allowedMethods())
router.use(banners.routes(), banners.allowedMethods())
router.use(admin.routes(), admin.allowedMethods())
router.use(articles.routes(), articles.allowedMethods())

app.use(router.routes(), router.allowedMethods())


// error-handling
app.on('error', (err, ctx) => {
  log4js.error(`${err.stack}`)
});

module.exports = app
