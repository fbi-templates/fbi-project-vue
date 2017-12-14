/*
  Date: 2017-12-12
  Desc: Modular Lodash builds without the hassle. You can freely add the method you need
  Detail:
    https://www.npmjs.com/package/lodash-webpack-plugin
    https://www.npmjs.com/package/babel-plugin-lodash
*/

import _ from 'lodash'

export default {
  clone: _.clone,
  cloneDeep: _.cloneDeep,
  debounce: _.debounce,
  throttle: _.throttle,
  find: _.find,
  keys: _.keys,
  values: _.values,
  size: _.size,
  isEmpty: _.isEmpty,
  isFunction: _.isFunction,
  isArray: _.isArray,
  isDate: _.isDate
}
