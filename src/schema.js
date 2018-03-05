import { Schema } from 'prosemirror-model';
import { marks } from 'prosemirror-schema-basic';


const schema = new Schema({
  nodes: {
    doc: {
      content: 'block+'
    }
  , paragraph: {
      content: 'inline*'
    , group: 'block'
    , parseDOM: [
        {tag: 'p'}
      ]
    , toDOM() { return ['p', 0]; }
    }
  , code_block: {
      content: 'text*'
    , marks: ''
    , group: 'block'
    , code: true
    , defining: true
    , parseDOM: [
       {tag: 'pre', preserveWhitespace: 'full'}
      ]
    , toDOM() { return ['pre', ['code', 0]]; }
    }
  , blockquote: {
      content: 'block+'
    , group: 'block'
    , defining: true
    , parseDOM: [
        {tag: 'blockquote'}
      ]
    , toDOM() { return ['blockquote', 0]; }
    }
  , heading: {
      attrs: {level: {default: 1}}
    , content: 'inline*'
    , group: 'block'
    , defining: true
    , parseDOM: [
        {tag: 'h1', attrs: {level: 1}}
      , {tag: 'h2', attrs: {level: 2}}
      , {tag: 'h3', attrs: {level: 3}}
      , {tag: 'h4', attrs: {level: 4}}
      , {tag: 'h5', attrs: {level: 5}}
      , {tag: 'h6', attrs: {level: 6}}
      ]
    , toDOM(n) { return ['h' + n.attrs.level, 0]; }
    }
  , text: {
      group: 'inline'
    }
  , hard_break: {
      inline: true
    , group: 'inline'
    , selectable: false
    , parseDOM: [{tag: 'br'}]
    , toDOM() { return ['br']; }
    }
  }
, marks
});

export default schema;
