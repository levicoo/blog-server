const router = require('koa-router')()
const util = require('../utils/util')
const Articles = require('../models/articleSchema')
router.get('/tags', async ctx => {
    const res = await Articles.find({}, { tag: 1 })
    if (res) {
        ctx.body = util.success(res)

    } else {
        ctx.body = util.fail('错误')
    }

})


router.get('/article', async ctx => {
    const params = ctx.request.query;
    console.log('****************', params)
    try {
        if (params.tag == 'blog') {
            const res = await Articles.find().sort({ "uploadTime": -1 })
            if (res) {
                ctx.body = util.success(res)

            } else {
                ctx.body = util.fail('错误')
            }
        } else {
            const res = await Articles.find(params).sort({ "sequence": 1 })

            if (res) {
                ctx.body = util.success(res)

            } else {
                ctx.body = util.fail('错误')
            }
        }

    } catch (error) {
        ctx.body = util.fail(error.msg)
    }
})

router.post('/operate/article', async ctx => {
    const number = await Articles.find()
    let { _id, action, name, content, frontpage, className, sequence = number.length + 1, guide, tag } = ctx.request.body
    tag = tag.split(',')
    const uploadTime = new Date();
    const createTime = new Date();
    if (action == 'create') {
        const res = await Articles.create({
            name, content, className, sequence, createTime, uploadTime, frontpage, guide, tag
        })
        if (res) {
            ctx.body = util.success(res)
        } else {
            ctx.body = util.fail('错误')
        }
    } else if (action == 'edit') {
        const params = { name, content, sequence, className, uploadTime, frontpage, guide, tag }
        let res = await Articles.findByIdAndUpdate(_id, params)
        if (res) {
            ctx.body = util.success(res)

        } else {
            ctx.body = util.fail('错误')
        }
    } else {
        const res = await Articles.findByIdAndRemove(_id)
        if (res) {
            ctx.body = util.success(res)
        } else {
            ctx.body = util.fail('错误')
        }
    }

})

module.exports = router