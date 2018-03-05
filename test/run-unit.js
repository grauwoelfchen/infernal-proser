#!/usr/bin/env node

require('reify');
require('buble-register');

var path = require('path')
  , glob = require('glob')
  ;

process.argv.slice(2).forEach(function (arg) {
  glob(arg, function (err, files) {
    if (err) throw err

    files.forEach(function (file) {
      require(path.resolve(process.cwd(), file))
    })
  })
});
