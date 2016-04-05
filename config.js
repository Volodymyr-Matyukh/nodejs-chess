var path = require('path');
var pkg = require('./package.json');

var target = path.join(__dirname, 'lib/client');
var assets = path.join(target, 'assets');
var images = path.join(assets, 'images');
var prefix = pkg.name + '-' + pkg.version;

var js = {
  src: [path.resolve(__dirname, 'client/src/index.js')],
  dest: prefix + '.js'
};

var partials = {
  module: 'chess',
  src: path.resolve(__dirname, 'client/src/chess'),
  dest: prefix + '-partials.js'
};

var less = {
  src: path.resolve(__dirname, 'client/src/index.less'),
  dest: prefix + '.css'
};

var html = {
  src: path.resolve(__dirname, 'client/src/index.html'),
  dest: 'index.html',
  files: [
    js.dest,
    partials.dest,
    less.dest
  ]
};

var env = Object.assign({
  NODE_ENV: 'development',
  API_URL: '//localhost:8081'
}, process.env);

module.exports = {
  target,
  assets,
  env,
  js,
  partials,
  less,
  html
};
