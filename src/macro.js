import {inputRules,
        smartQuotes, emDash,  ellipsis} from 'prosemirror-inputrules'


export function macro() {
  let rules = smartQuotes.concat(ellipsis, emDash);

  return inputRules({rules});
}
