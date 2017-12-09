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

- **2.0.0** (2017.12.06)
  - Improvements: build performance, use of configuration

- **1.2.0** (2017.11.21)
  - Change `fbi/config.js` to `fbi/options.js`