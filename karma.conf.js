const buble = require('rollup-plugin-buble');
const replace = require('rollup-plugin-replace');
const commonjs = require('rollup-plugin-commonjs');
const nodeBuiltins = require('rollup-plugin-node-builtins');
const nodeGlobals = require('rollup-plugin-node-globals');
const nodeResolve = require('rollup-plugin-node-resolve');

const faucet = require('faucet');


module.exports = (config) => {
  config.set({
    basePath: ''
  , autoWatch: false
  , browsers: ['FirefoxHeadless']
  , browserConsoleLogOptions: {
      level: 'error'
    , format: '%b %T: %m'
    , terminal: true
    }
  , logLevel: config.LOG_ERROR
  , colors: true
  , files: [
      'dst/index.js'
      // rollup fix (via test/prepare-karma.sh)
    , 'test/build/tape.js'
      // test
    , 'test/etoe/**/*-test.js'
    ]
  , frameworks: [
      'tap'
    ]
  , plugins: [
      'karma-rollup-preprocessor'
    , 'karma-firefox-launcher'
    , 'karma-tap'
    , 'karma-tap-pretty-reporter'
    ]
  , reporters: [
      'tap-pretty'
    ]
  , preprocessors: {
      './dst/index.js': ['rollup']
    , './test/etoe/**/*-test.js': ['rollup']
    }
  , rollupPreprocessor: {
      output: {
        format: 'iife'
      , name: 'vergil'
      , sourcemap: false
      // rollup fix
      , globals: {
          'tape': 'tape'
        }
      }
    , plugins: [
        nodeGlobals()
      , nodeBuiltins()
      , nodeResolve({
          jsnext: false
        , module: true
        , main: true
        , browser: true
        })
      , replace({
           'process.env': JSON.stringify('testing')
        })
      , buble()
      , commonjs()
      ]
    // rollup fix
    , external: ['tape']
    }
  , tapReporter: {
      prettify: faucet
    }
  , singleRun: true
  });
};
