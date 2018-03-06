import {Plugin} from 'prosemirror-state';
import {Decoration, DecorationSet} from 'prosemirror-view';


export let setPlaceholder = (text) => {
  return new Plugin({
    props: {
      decorations(state) {
        const doc = state.doc;

        if (doc.childCount !== 1 ||
            !doc.firstChild.isTextblock ||
            doc.firstChild.content.size > 0) {
          return null;
        }

        const node = document.createElement('div');
        node.classList.add('placeholder');
        node.textContent = text;

        return DecorationSet.create(
          doc,
          [Decoration.widget(1, node)]
        );
      }
    }
  });
};
