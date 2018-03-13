import test from 'tape';

import {linkEvent} from 'inferno';
import {h} from 'inferno-hyperscript';

import {Editor, buildHandler} from '../../src/editor';


test('buildHandler returns null for invalid prop value', (t) => {
  t.plan(1);

  const onInputHandler = buildHandler('onInput');
  let instance = {props: {}}

  t.equal(null, onInputHandler(instance, null), 'buildHandler');
  t.end();
});

test('buildHandler invokes handler via data', (t) => {
  t.plan(2);

  const onInputHandler = buildHandler('onInput');
  let onInput = linkEvent('this', (data, event) => {
    t.equal('this', data, 'data must be taken from value');
    return 'done';
  });
  let instance = {props: {onInput}};

  t.equal('done', onInputHandler(instance, null), 'buildHandler');
  t.end();
});

test('buildHandler invokes handler given as onInput directly', (t) => {
  t.plan(2);

  const onInputHandler = buildHandler('onInput');
  let onInput = (data, event) => {
    t.equal(instance, data, 'data must be editor instance');
    return 'done';
  };
  let instance = {props: {onInput}};

  t.equal('done', onInputHandler(instance, null), 'buildHandler');
  t.end();
});

test('config prop', (t) => {
  t.plan(1);

  let config = {};
  const component = h(Editor, {config});

  t.equal(config, component.props.config, 'props');
  t.end();
});
