/**
 * 根据命令行参数获取端口
 * 如：fbi s -3000
 *
 * @param {any} ctx
 * @param {any} def
 */
module.exports = (ctx, def) => {
  let port = def

  if (ctx.taskParams) {
    ctx.taskParams.map(item => {
      if (!isNaN(item * 1) && item.length >= 2) {
        port = item * 1
      }
    })
  }
  return port
}