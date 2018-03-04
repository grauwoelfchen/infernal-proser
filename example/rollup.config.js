import buble from 'rollup-plugin-buble';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';

export default {
  input: './src/index.js'
, output: {
    file: 'dst/bundle.js'
  , format: 'iife'
  , sourcemap: 'inline'
  }
, plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  , json()
  , nodeResolve({
      jsnext: true
    , preferBuiltins: false
    , extensions: ['.js', '.json']
    })
  , commonjs()
  , buble()
  ]
}
