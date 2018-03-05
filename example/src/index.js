import { version } from '../package.json';

import { render } from 'inferno';
import { h } from 'inferno-hyperscript';

import { Editor, Parser, Placeholder } from 'vergil';

render(
  h('div.wrapper',[
    h('span', 'version: ' + version)
  , h(Editor, {
      config: {
        content: Parser.parse(document.querySelector('#content'))
      , plugins: [
          Placeholder('Write something here...')
        ]
      }
    }),
  ])
, document.querySelector('#container')
);
