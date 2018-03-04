import { Component } from 'inferno';
import { h } from 'inferno-hyperscript';

import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';


class Editor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      state: EditorState.create({
        doc: props.config.content
      , plugins: props.config.plugins
      })
    }
  }

  handleChange(event) {
    if (this.props.onChange) {
      return this.props.onChange(event);
    }
  }

  dispatchTransaction(transaction) {
    const state = this.view.state.apply(transaction);
    this.view.updateState(state);
    this.setState({state});
    this.handleChange({target: state.doc});
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
    });
  }
}

export default Editor
