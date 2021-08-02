const router = require('koa-router')()
const util = require('../utils/util')
const Banner = require('./../models/bannerSchema')

router.get('/banners', async ctx => {
    try {
        const res = await Banner.find({}).sort({ "sequence": 1 })
        if (res) {
            ctx.body = util.success(res)
        } else {
            ctx.body = util.fail('meiyouziyuan')
        }
    } catch (error) {
        ctx.body = util.fail(error.msg)
    }

})

router.post('/banners/operate', async (ctx) => {
    let { _id, sequence, action, imgUrl, title } = ctx.request.body
    if (action == 'create') {
        let params = { sequence, imgUrl, title }
        console.log(params)
        params.uploadTime = new Date();
        params.createTime = new Date();
        const res = await Banner.create({ ...params })
        ctx.body = util.success(res)
    } else if (action == 'edit') {
        try {
            let params = { sequence, title, imgUrl }
            console.log(params)
            params.uploadTime = new Date();
            const res = await Banner.findByIdAndUpdate(_id, params)
            console.log('res---------', res)
            ctx.body = util.success(res)
        } catch (error) {
            ctx.body = util.fail(error)
        }
    } else {
        try {
            const res = await Banner.findByIdAndRemove(_id)
            ctx.body = util.success(res)
        } catch (error) {
            ctx.body = util.fail(error)
        }
    }

})

module.exports = router