// vergil's package.json
import {version} from '../../package.json';

import {render} from 'inferno';
import {h} from 'inferno-hyperscript';

import {Editor, setPlaceholder} from 'vergil';

render(
  // inferno v4.x does not include multiple fragments yet.
  // https://github.com/infernojs/inferno/issues/501
  h('.wrapper',[
    h('.version', 'version: ' + version)
  , h(Editor, {
      config: {
        className: '.vergil'
      , content: document.querySelector('#content')
      , plugins: [
          setPlaceholder('Write something here...')
        ]
      }
    , event: {  // optinal
        onFocusIn: (e) => {
          e //window.console.log('(onFocusIn): ' + e)
        }
      , onInput: (e) => {
          e //window.console.log('(onInput)' + e)
        }
      , onFocusOut: (e) => {
          e //window.console.log('(onFocusOut): ' + e)
        }
      }
    , hook: {  // optional
        beforeDispatch: (t) => {
          t //window.console.log('beforeDispatch: ' + t)
        }
      , afterDispatch: (t) => {
          t //window.console.log('afterDispatch: ' + t)
        }
      }
    })
  ])
, document.querySelector('#editor')
);
