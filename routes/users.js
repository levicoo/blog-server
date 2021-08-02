const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const User = require('./../models/usersSchema')
const util = require('./../utils/util')


router.prefix('/users')

router.post('/login', async (ctx) => {
  try {
    const { userName, userPwd } = ctx.request.body;
    const res = await User.findOne({
      userName, userPwd
    }) 
    if (res) { 
      const data = res._doc
      const token = jwt.sign({
        data
      }, 'levi', { expiresIn: '1h' })
      data.token = token
      ctx.body = util.success(data)
    } else {
      ctx.body = util.fail("账号或密码不正确")
    }
  } catch (error) {
    ctx.body = util.fail(error.msg)
  }
})

module.exports = router
