// NOTE:
// Temporary? solution to fix errors in rollup like below
//
// * 'xxx' is not exported by node_modules/xxx/xxx.js
// * default is not exported by node_modules/xxx/xxx.js
//
// See also `karma.conf.js` and `package.json`
// ref: https://github.com/thisconnect/test-karma-rollup-tape
module.exports = require('tape');
