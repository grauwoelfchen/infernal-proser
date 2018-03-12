import {linkEvent, Component} from 'inferno';
import {h} from 'inferno-hyperscript';
import {isFunction} from 'inferno-shared';

import {EditorState} from 'prosemirror-state';
import {EditorView} from 'prosemirror-view';

import {parser} from './parser';
import {keymap} from './keymap';
import {macro} from './macro';


// events
const buildHandler = (prop) => {
  return (instance, event) => {
    let value = instance.props[prop];
    if (isFunction(value)) {
      return value(instance, event);
    } else if (typeof value === 'object' && value !== null) {
      return value;
    } else {
      return null;
    }
  };
}

// hooks
const handleBeforeDispatch = (instance, transaction) => {
  let beforeDispatch = instance.props.beforeDispatch;
  if (isFunction(beforeDispatch)) {
    beforeDispatch(transaction);
  }
}

const handleAfterDispatch = (instance, transaction) => {
  let afterDispatch = instance.props.afterDispatch;
  if (isFunction(afterDispatch)) {
    afterDispatch(transaction);
  }
}

const className = '.vergil';

export class Editor extends Component {
  constructor(props) {
    if (!props.config) {
      props.config = {plugins: [], className};
    }

    if (!Array.isArray(props.config.plugins)) {
      props.config.plugins = [];
    }
    super(props);

    let plugins = [ // built-in
      macro()
    , keymap()
    ].concat(this.props.config.plugins)

    this.state = {
      state: EditorState.create({
        doc: parser.parse(this.props.config.content)
      , plugins: plugins
      })
    }
  }

  dispatchTransaction(transaction) {
    handleBeforeDispatch(this, transaction);

    const state = this.view.state.apply(transaction);
    this.view.updateState(state);
    this.setState({state});

    handleAfterDispatch(this, transaction);
  }

  render() {
    const className_ = this.props.config.className || className;
    return h(className_, {
      ref: (node) => {
        if (!this.view) {
          this.view = new EditorView(node, {
            state: this.state.state
          , dispatchTransaction: this.dispatchTransaction.bind(this)
          });
        }
      }
    , onFocusIn: linkEvent(this, buildHandler('onFocusIn'))
    , onFocusOut: linkEvent(this, buildHandler('onFocusOut'))
    , onInput: linkEvent(this, buildHandler('onInput'))
    });
  }
}
