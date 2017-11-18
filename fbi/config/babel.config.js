module.exports = {
  babelrc: false,
  presets: [
    [
      ctx.nodeModulesPath + '/babel-preset-env',
      {
        targets: ctx.options.webpack.targets,
        modules: false,
        useBuiltIns: true,
        debug: ctx.mode.debug
      }
    ],
    ctx.nodeModulesPath + '/babel-preset-stage-1'
  ]
}
