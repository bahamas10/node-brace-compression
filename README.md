brace-compression
=================

Reverse brace expansion (like sh/bash)

Warnings
--------

- the output is not escaped or necessarily safe to parse using the shell -
this is just meant to compress data for human-readable purposes.
- may not work in every case

Example
-------

``` js
var compress = require('brace-compression');
var data = [
  'foo-1',
  'foo-2',
  'foo-3'
];

console.log(compress(data));
// => "foo-{1..3}"
```

The input array should be sorted before being passed to `compress`

Installation
------------

    npm install brace-compression

License
-------

MIT License
