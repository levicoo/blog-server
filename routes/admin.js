const router = require('koa-router')()
const util = require('../utils/util')
const AdminMenus = require('../models/adminMenusSchema')
const Menu = require('../models/menusSchema')
const logo = require('../models/logoSchema')
const Banner = require('./../models/bannerSchema')
router.prefix('/admin')
// 菜单列表
router.get('/menus', async ctx => {
    try {
        const res = await AdminMenus.find({})
        if (res) {
            ctx.body = util.success(res)
        }
    } catch (error) {
        console.log(error)
        ctx.body = util.fail(error.msg)
    }
})
// 获取首页logo
router.get('/frontpage/logo', async ctx => {
    try {
        const res = await logo.find()
        if (res) {
            ctx.body = util.success(res)
        }
    } catch (error) {
        console.log(error)
        ctx.body = util.fail(error.msg)
    }
})
//修改首页 logo
router.post('/frontpage/logo/operate', async ctx => {
    console.log(ctx.request.body)
    const { _id, content } = ctx.request.body
    console.log(_id)
    let params = { _id, content }
    params.uploadTime = new Date();
    res = await logo.findByIdAndUpdate(_id, params)
    console.log(res)
    ctx.body = util.success(res)
})

// 获取首页header
router.get('/frontpage/header', async ctx => {
    try {
        const res = await Menu.find()
        console.log(res)
        if (res) {
            ctx.body = util.success(res)
        }
    } catch (error) {
        console.log(error)
        ctx.body = util.fail(error.msg)
    }
})
// 修改首页 header
router.post('/frontpage/header/operate', async ctx => {
    const { title, path, action, sequence, _id } = ctx.request.body
    console.log('========', ctx.request.body)
    let res, info;
    try {
        if (action == 'create') {
            res = await Menu.create({
                title, path, sequence, uploadTime: new Date()
            })
            info = "创建成功"
        } else if (action == 'delete') {
            if (_id) {
                res = await Menu.findByIdAndRemove(_id)
                info = "删除成功"
            } else {
                ctx.body = util.fail("缺少参数params: _id")
                return;
            }
        } else {
            if (_id) {
                let params = { title, path, sequence }
                params.uploadTime = new Date();
                res = await Menu.findByIdAndUpdate(_id, params)
                info = "编辑成功"
            } else {
                ctx.body = util.fail("缺少参数params: _id")
                return;
            }

        }
        ctx.body = util.success(res, info)
    } catch (error) {
        console.log(error)
        ctx.body = util.fail(error.msg)
    }

})
// 获取banner
router.get('/frontpage/banner', async ctx => {
    try {
        const res = await logo.find()
        if (res) {
            ctx.body = util.success(res)
        }
    } catch (error) {
        console.log(error)
        ctx.body = util.fail(error.msg)
    }
})
module.exports = router