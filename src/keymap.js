import {chainCommands, exitCode, newlineInCode,
        createParagraphNear,
        liftEmptyBlock, splitBlock} from 'prosemirror-commands';
import {keymap as keymap_} from 'prosemirror-keymap';

import {schema} from './schema';


// `mapKeys` e.g. {
//   'Mod-B': 'Ctrl-B', 'Ctrl-C': false
// }
export function keymap(mapKeys) {
  let maps = {}
      mapKeys = !mapKeys ? {} : mapKeys
    ;

  // mapKeys, maps
  let imap = (key, operation) => {
    if (mapKeys) {
      let mapping = mapKeys[key];
      if (mapping === false) {
        return;
      }
      if (mapping) {
        key = mapping;
      }
    }
    maps[key] = operation;
  };

  imap('Enter', chainCommands(
    newlineInCode
  , createParagraphNear
  , liftEmptyBlock
  , splitBlock
  ));

  let type;

  type = schema.nodes.hard_break;
  if (type) {
    let br = type
      , operation = chainCommands(exitCode, (state, dispatch) => {
          dispatch(state.tr.replaceSelectionWith(
            br.create()).scrollIntoView());
          return true;
        })
      ;

    imap('Enter', operation);
    imap('Shift-Enter', operation);
  }
  return keymap_(maps);
}
