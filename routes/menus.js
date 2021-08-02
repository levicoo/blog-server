const router = require('koa-router')()
const util = require('../utils/util')
const Menu = require('../models/menusSchema')
const logo = require('../models/logoSchema')

router.get('/menus', async ctx => {
    try {
        const res = await Menu.find({}).sort({ "sequence": 1 })
        if (res) {
            ctx.body = util.success(res)
        }
    } catch (error) {
        console.log(error)
        ctx.body = util.fail(error.msg)
    }
})
router.get('/logotitle', async ctx => {
    try {
        const res = await logo.find({})
        if (res) {
            ctx.body = util.success(res)
        }
    } catch (error) {
        console.log(error)
        ctx.body = util.fail(error.msg)
    }
})



module.exports = router