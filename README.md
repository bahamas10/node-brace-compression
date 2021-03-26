brace-compression
=================

Reverse brace expansion (like sh/bash)

Warnings
--------

- the output is not escaped or necessarily safe to parse using the shell -
this is just meant to compress data for human-readable purposes.
- may not work in every case
- output is an array

Example
-------

``` js
var compress = require('brace-compression');
var data = [
    'foo-1',
    'foo-2',
    'foo-3'
];

var s = compress(data).join(' ');
console.log(s);
// => "foo-{1..3}"
```

The input array should be sorted before being passed to `compress`

CLI
---

    $ cat file.txt
    foo-1
    foo-2
    foo-3
    $ cat file.txt | brace-compress
    foo-{1..3}

Installation
------------

    npm install [-g] brace-compression

License
-------

MIT License
