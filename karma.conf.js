const path = require('path');

const buble = require('rollup-plugin-buble')
    , replace = require('rollup-plugin-replace')
    , commonjs = require('rollup-plugin-commonjs')
    , nodeBuiltins = require('rollup-plugin-node-builtins')
    , nodeGlobals = require('rollup-plugin-node-globals')
    , nodeResolve = require('rollup-plugin-node-resolve')
    ;

const faucet = require('faucet');

module.exports = (config) => {
  let builtFile = path.resolve(__dirname, 'dst/index.js')
    , testPacks = path.resolve(__dirname, 'test/build/tape.js')
    , testFiles = path.resolve(__dirname, 'test/etoe/**/*-test.js')
    ;
  let preprocessors = {};
  preprocessors[builtFile] = ['rollup'];
  preprocessors[testFiles] = ['rollup'];

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
      builtFile
    , testPacks  // rollup fix (via test/prepare-karma.sh)
    , testFiles
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
  , preprocessors: preprocessors
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
           'process.env': JSON.stringify('test')
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
