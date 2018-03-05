import { DOMParser } from 'prosemirror-model';

import { default as Schema } from './schema';


let Parser = DOMParser.fromSchema(Schema);

export default Parser;
