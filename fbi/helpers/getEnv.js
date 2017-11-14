/**
 * 根据命令行参数获取环境名称
 * 如：fbi b -prod
 * config里有定义prod的data
 *
 * @param {any} ctx
 * @param {any} def
 */
module.exports = (ctx, def) => {
  ctx.env = def
  const envData = ctx.options.webpack.data
  const envDataItemArr = Object.keys(envData)

  if (ctx.taskParams) {
    ctx.taskParams.map(item => {
      if (envDataItemArr.includes(item)) {
        ctx.env = item
      }
    })
  }
  ctx.env && ctx.logger.log(`Environment: ${ctx.utils.style.yellow(ctx.env)}`)
}
