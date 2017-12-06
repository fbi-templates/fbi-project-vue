# fbi-project-vue
A modern project which uses `Vue.js` and `Webpack`.

> This is a fbi project template. If you haven't installed [fbi](https://github.com/AlloyTeam/fbi) yet, use the following command to install.
>
> `$ npm i -g fbi`
## Requirements
- `fbi v3.0+`
- `node v7.6+`

## Usage
```bash
$ cd path/to/workspace
$ fbi init https://github.com/fbi-templates/fbi-project-vue.git new-project  
$ fbi s                      
```

or

```bash
$ fbi add https://github.com/fbi-templates/fbi-project-vue.git
$ cd path/to/workspace
$ fbi init vue vue-project
$ fbi ls 
$ fbi <task> [params]
```

## Run a task
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

## More
- [Official templates](https://github.com/fbi-templates)
- [fbi full documentation](https://neikvon.gitbooks.io/fbi/content/)

## Changelog

- 2017.12.06 18:12  (Version: `2.0.0`)
1. Improvements: build performance, use of configuration

- 2017.11.21 18:12  (Version: `1.2.0`)
1. Change `fbi/config.js` to `fbi/options.js`