# fbi-project-vue
A modern project which uses `Vue.js` and `Webpack`.

> This is a fbi project template. If you haven't installed [fbi](https://github.com/AlloyTeam/fbi) yet, use the following command to install.
>
> `$ npm i -g fbi` or `yarn global add fbi`
## Requirements
- `fbi v3.0+`
- `node v7.6+`

## Usage

**Create a project**

```bash
$ cd path/to/workspace
$ fbi init https://github.com/fbi-templates/fbi-project-vue.git new-project  
```

or

```bash
$ fbi add https://github.com/fbi-templates/fbi-project-vue.git
$ cd path/to/empty-folder
$ fbi init vue
```

**Show available tasks**
```bash
$ fbi ls
```

**Run a task**
```bash
$ fbi <task> [params]
```

## Tasks

### `serve`
- Description: Compile and start development server.
- Params:
  - `port` `{Number}` Server starting port. If occupied, switch automatically.
- Alias: `s`
- Examples:
  - `fbi s -port=9999`

### `build`
- Description: Build the project for the specified environment.
- Params:
  - `prod` `{Boolean}` (default) Production environment.
  - `test` `{Boolean}` Test environment.
- Alias: `b`
- Examples:
  - `fbi b -t`
  - `fbi b -t=true`
  - `fbi b -test=true`
  - `fbi b --p`

## More
- [Official templates](https://github.com/fbi-templates)
- [`fbi` documentation](https://neikvon.gitbooks.io/fbi/content/)

## License
[MIT](https://opensource.org/licenses/MIT)

## Changelog
- **3.0.2** （2017.12.15）
  - 新增`fbi analyz`命令，分析打包文件性能
  - `babel`配置中新增`babel-plugin-lodash`相关配置，修复loadsh未能按需引入bug
- **3.0.1** (2017.12.14)
  - 新增`global.js`全局注册组件和工具方法，直接在组件内部使用
  - 新增`vuex-persistedstate`做vuex state持久化存储
  - 新增`lodash-webpack-plugin`配置按需引入loadsh
  - 优化ajax请求处理公共方法

- **2.0.2** (2017.12.09)
  - Add `.editorconfig`

- **2.0.0** (2017.12.06)
  - Improvements: build performance, use of configuration

- **1.2.0** (2017.11.21)
  - Change `fbi/config.js` to `fbi/options.js`