const router = require('koa-router')()
router.post('/ppp', ctx => {
  const file = ctx.request.files.file;
  console.log(file)
})

module.exports = router
