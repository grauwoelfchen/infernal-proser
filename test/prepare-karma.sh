#!/usr/bin/env sh

test_dir=$(dirname "$0")

browserify $test_dir/tape.js \
  --standalone tape \
  -o $test_dir/build/tape.js
