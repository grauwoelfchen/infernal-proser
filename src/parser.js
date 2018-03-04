import { Schema, DOMParser } from 'prosemirror-model';
import { schema } from 'prosemirror-schema-basic';

const aSchema = new Schema({
  nodes: {
    doc: {
      content: 'block+'
    }
  , paragraph: {
      group: 'block'
    , content: 'text*'
    , toDOM(_node) { return ['p', 0] }
    }
  , text: {}
  }
, marks: schema.spec.marks
});

let Parser = DOMParser.fromSchema(aSchema);

export default Parser;
