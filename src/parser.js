import {DOMParser} from 'prosemirror-model';

import {schema} from './schema';


export let parser = DOMParser.fromSchema(schema);
