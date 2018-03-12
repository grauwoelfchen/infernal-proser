# Vergil

`/ˈvɜːrdʒɪl/`


[![pipeline status][pipeline]][commit] [![npm version][version]][npm]

```txt
\  /_ .__ o|
 \/(/_|(_|||
        _|
```

An editor written with [Inferno](https://www.infernojs.org/) + [ProseMirror](http://prosemirror.net/)


## Usage

```javascript
import {render} from 'inferno';
import {h} from 'inferno-hyperscript';

import {Editor, setPlaceholder} from 'vergil';

render(
  h('.wrapper',[
    h(Editor, {
      config: {
        className: '.vergil'
      , content: document.querySelector('#content')
      , plugins: [
          setPlaceholder('Write something here...')
        ]
      }
    // event handlers (optinal)
    , onFocusIn: (e) => { ... }
    , onInput: (e) => { ... }
    , onFocusOut: (e) => { ... }
    // transaction hooks (optional)
    , beforeDispatch: (t) => { ... }
    , afterDispatch: (t) => { ... }
    })
  ])
, document.querySelector('#editor')
);
```


## Build

```zsh
% npm run build
```


## Test

### Unit Test

```zsh
: with tape
% npm test
```

### E2E Test

```zsh
: via karma
% npm run karma
```


## License

This program is free software: you can redistribute it and/or modify it
under the terms of the MIT License.


See [LICENSE](LICENSE).


```txt
Vergil
Copyright (c) 2018 Yasuhiro Asaka
```


[pipeline]: https://gitlab.com/grauwoelfchen/vergil/badges/master/pipeline.svg
[commit]: https://gitlab.com/grauwoelfchen/vergil/commits/master
[version]: https://img.shields.io/npm/v/vergil.svg
[npm]: https://www.npmjs.com/package/vergil
