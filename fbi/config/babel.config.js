module.exports = {
  babelrc: false,
  presets: [
    [
      'babel-preset-env',
      {
        targets: ctx.options.webpack.targets,
        modules: false,
        useBuiltIns: true,
        debug: ctx.mode.debug
      }
    ],
    'babel-preset-stage-1'
  ]
}
