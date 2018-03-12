// vergil's package.json
import {version} from '../../package.json';

import {render, linkEvent} from 'inferno';
import {h} from 'inferno-hyperscript';

import {Editor, setPlaceholder} from 'vergil';

const handleOnInput = (instance, event) => {
  // window.console.log(instance);
  // window.console.log(event);
  window.console.log('(handleOnInput)');
};

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
      // events (optinal)
    , onFocusIn: (instance, event) => {
        window.console.log('(onFocusIn)');
      }
    , onInput: handleOnInput
    , onFocusOut: (instance, event) => {
        window.console.log('(onFocusOut)');
      }
      // hooks (optional)
    , beforeDispatch: (transaction) => {
        transaction;
        // window.console.log('[beforeDispatch]: ' + transaction);
      }
    , afterDispatch: (transaction) => {
        transaction;
        // window.console.log('[afterDispatch]: ' + transaction);
      }
    })
  ])
, document.querySelector('#editor')
);
