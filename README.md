# fbi-project-vue

A modern project which uses `Vue.js` and `Webpack`.

> This is a fbi project template. If you haven't installed [fbi](https://github.com/AlloyTeam/fbi) yet, use the following command to install.
>
> `$ npm i -g fbi` or `yarn global add fbi`

## Requirements

- `fbi v3.0+`
- `node v7.6+`

## Features

- support 'single file components' and 'separated files components'
- Eslint using [standard](https://standardjs.com/) config
- SASS like css - [precss](https://github.com/jonathantneal/precss)
- http proxy
- unlimited environment data

## Usage

**Add template**

```bash
$ fbi add https://github.com/fbi-templates/fbi-project-vue.git
```

**Create a project**

```bash
$ cd path/to/empty-folder
$ fbi init -o vue

# or
$ fbi init -o vue my-app
```

**Show available tasks**

```bash
$ fbi ls
```

**Run a task**

```bash
$ fbi <task> [params]
```

**Update template**

```bash
$ fbi up vue
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
  - `p/prod` `{Boolean}` (default) Production environment.
  - `t/test` `{Boolean}` Test environment.
- Alias: `b`
- Examples:
  - `fbi b -t`
  - `fbi b -p`

## More

- [Official templates](https://github.com/fbi-templates)
- [`fbi` documentation](https://neikvon.gitbooks.io/fbi/content/)

## License

[MIT](https://opensource.org/licenses/MIT)

## Changelog

[Latest log](./CHANGELOG.md)


Earlier log:
- **4.0.1** (2018.07.11)

  - Fixes 'processNextTick is not a function'
  - Fixes eslint error
  - Fixes hot reload bugs
  - Fixes default demo bugs
  - add 'separated files components' demo
  - update `options.js`
  - update devDependencies
  - update readme

- **4.0.0** (2018.07.10)

  - Update `webpack`
  - Update directory structure

* **2.0.2** (2017.12.09)

  - Add `.editorconfig`

* **2.0.0** (2017.12.06)

  - Improvements: build performance, use of configuration

* **1.2.0** (2017.11.21)
  - Change `fbi/config.js` to `fbi/options.js`
