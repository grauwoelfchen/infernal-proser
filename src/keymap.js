import {
  chainCommands
, exitCode
, newlineInCode
, createParagraphNear
, liftEmptyBlock
, splitBlock
, deleteSelection
, joinBackward
, selectNodeBackward
} from 'prosemirror-commands';
import {keymap as keymap_} from 'prosemirror-keymap';

import {schema} from './schema';


const bsCommands = chainCommands(
  deleteSelection
, joinBackward
, selectNodeBackward
);

const delCommands = chainCommands(  // same with backspace
  deleteSelection
, joinBackward
, selectNodeBackward
);

const enterCommands = chainCommands(
  newlineInCode
, createParagraphNear
, liftEmptyBlock
, splitBlock
);


// `mapKeys` e.g. {
//   'Mod-B': 'Ctrl-B',
//   'Ctrl-C': false
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

  // basic mappings
  imap('Backspace', bsCommands);
  imap('Delete', delCommands);
  imap('Enter', enterCommands);

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
    imap('Shift-Enter', operation);
  }
  return keymap_(maps);
}
