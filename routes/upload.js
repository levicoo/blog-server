// const multer = require('@koa/multer');
// const router = require('koa-router')()
// const util = require('./../utils/util')
// const baseURL = "http://localhost:3000/"
// const Banner = require('./../models/bannerSchema')

// const year = new Date().getFullYear()
// const month = new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1
// const days = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()
// const storage = multer.diskStorage({
//     destination: 'public/' + year + month + days,
//     filename(ctx, file, cb) {
//         const filenameArr = file.originalname
//         cb(null, filenameArr)
//     }
// })
// const upload = multer({ storage });
// router.post('/upload', upload.single('banner'), async (ctx, next) => {
//     const number = await Banner.find({})
//     let sequence = number.length + 1
//     const { filename, path } = ctx.file
//     try {
//         const res = await Banner.create({
//             title: filename,
//             path: baseURL + path,
//             sequence
//         }, (err, data) => {
//             if (!err) {
//                 ctx.body = util.success(res)
//             }
//             ctx.body = util.fail(err)
//         })
//         ctx.body = util.success(res, baseURL + path)
//     } catch (error) {
//         ctx.body = util.fail(error)
//     }
// })


const router = require('koa-router')()
const path = require('path')
const getUploadDirName = require('../utils/getUploadDirname')
const util = require('./../utils/util')

router.post('/upload/banner', ctx => {
    const file = ctx.request.files.banner
    console.log(file)
    const basename = path.basename(file.path)
    const url = `http://localhost:3000/public/upload/${getUploadDirName()}/${basename}`
    ctx.body = {
        "error": 0,
        "url": url
    }
})

router.post('/upload/images', ctx => {
    const file = ctx.request.files.imgFile
    const basename = path.basename(file.path)
    console.log(file);
    const url = `http://localhost:3000/public/upload/${getUploadDirName()}/${basename}`
    ctx.body = {
        "error": 0,
        "url": url
    }
})




module.exports = router;