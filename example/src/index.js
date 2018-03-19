// vergil's package.json
import {version} from '../../package.json';

import {Component, render, linkEvent} from 'inferno';
import {h} from 'inferno-hyperscript';

import {Editor, setPlaceholder} from 'vergil';

const handleOnFocusIn = (instance, event) => {
  // instance is MyEditor (because linkEvent)
  //window.console.log(instance);
  //window.console.log(event);
  window.console.log('(onFocusIn)');

  // stop bubbles
  event.stopImmediatePropagation();
  event.preventDefault();
};

const handleOnFocusOut = (instance, event) => {
  // instance is MyEditor (because linkEvent)
  //window.console.log(instance);
  //window.console.log(event);
  window.console.log('(onFocusOut)');

  // stop bubbles
  event.stopImmediatePropagation();
  event.preventDefault();
};

const handleOnInput = (instance, event) => {
  // instance is Editor (vergil)
  //window.console.log(instance);
  //window.console.log(event);
  window.console.log('(onInput)');
};

// simple version
// render(
//   return h('.wrapper',[
//     h('.version', 'version: ' + version)
//   , h(Editor, {
//       config: {
//         className: '.vergil'
//       , content: document.querySelector('#content')
//       , plugins: [
//           setPlaceholder('Write something here...')
//         ]
//       }
//     , onFocusIn: (instance, event) => { window.console.log('(onFocusIn)'); }
//     , onFocusOut: handleOnFocusOut
//     , onInput: linkEvent(this, handleOnInput)
//
//     , beforeDispatch: null
//     , afterDispatch: null
//     })
//   ])
// );

// as componet
// you can bind this
class MyEditor extends Component {
  render() {
    // inferno v4.x does not include multiple fragments yet.
    // https://github.com/infernojs/inferno/issues/501
    return h('.wrapper',[
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
      , onFocusIn: linkEvent(this, handleOnFocusIn)
      , onFocusOut: linkEvent(this, handleOnFocusOut)
      , onInput: handleOnInput

        // hooks (optional)
      , beforeDispatch: (transaction) => {
          window.console.log('[beforeDispatch]: ' + transaction);
        }
      , afterDispatch: (transaction) => {
          window.console.log('[afterDispatch]: ' + transaction);
        }
      })
    ]);
  }
}

render(h(MyEditor, {}), document.querySelector('#editor'));
