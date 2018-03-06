import { linkEvent, Component } from 'inferno';
import { h } from 'inferno-hyperscript';

import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

import { keymap } from './keymap';
import { macro } from './macro';


// event
const handleInput = (props, event) => {
  if (props.event.onInput) {
    return props.event.onInput(event);
  }
};

const handleFocusIn = (props, event) => {
  if (props.event.onFocusIn) {
    return props.event.onFocusIn(event);
  }
};

const handleFocusOut = (props, event) => {
  if (props.event.onFocusOut) {
    return props.event.onFocusOut(event);
  }
};

// hook
const beforeDispatch = (props, transaction) => {
  if (props.hook.beforeDispatch) {
    return props.hook.beforeDispatch(transaction);
  }
}

const afterDispatch = (props, transaction) => {
  if (props.hook.afterDispatch) {
    return props.hook.afterDispatch(transaction);
  }
}

class Editor extends Component {
  constructor(props) {
    if (!props.config) {
      props.config = {plugins: []};
    }
    if (!props.event) {
      props.event = {};
    }
    if (!props.hook) {
      props.hook = {};
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
        doc: this.props.config.content
      , plugins: plugins
      })
    }
  }

  dispatchTransaction(transaction) {
    beforeDispatch(this.props, transaction);

    const state = this.view.state.apply(transaction);
    this.view.updateState(state);
    this.setState({state});

    afterDispatch(this.props, transaction);
  }

  render() {
    return h('div', {
      ref: (node) => {
        if (!this.view) {
          this.view = new EditorView(node, {
            state: this.state.state
          , dispatchTransaction: this.dispatchTransaction.bind(this)
          });
        }
      }
    , onFocusIn: linkEvent(this.props, handleFocusIn)
    , onFocusOut: linkEvent(this.props, handleFocusOut)
    , onInput: linkEvent(this.props, handleInput)
    });
  }
}

export default Editor
