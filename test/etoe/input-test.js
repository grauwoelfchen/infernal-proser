import { test } from 'tape';

import { h } from 'inferno-hyperscript';

import { Editor } from '../../dst/index';

test('config prop', (t) => {
  t.plan(1);

  let config = {};
  const component = h(Editor, {config});

  t.equal(component.props.config, config, 'props');
  t.end();
});
