/**
 * Brace Compression
 *
 * Reverse brace expansion (like sh/bash)
 *
 * Author: Dave Eddy <dave@daveeddy.com>
 * Date: April 29, 2015
 * License: MIT
 */

var f = require('util').format;

module.exports = brace;
function brace(a) {
  var newarray = [];

  function push() {
    if (obj) {
      var s = f('%s{%s..%s}%s', obj.base, obj.start, obj.end, obj.suffix);
      newarray.push(s);
      obj = null;
    } else {
      newarray.push(cur);
    }
  }

  var obj, cur, next;
  for (var i = 0; i < a.length; i++) {
    cur = a[i];
    next = a[i+1];

    if (!next)
      break;

    var cur_extract = extract(cur);
    var next_extract = extract(next);

    if (cur_extract.length !== next_extract.length) {
      push();
      continue;
    }

    var index = 0;
    for (var j = 0; j < cur_extract.length; j++) {
      var cur_elem = cur_extract[j];
      var next_elem = next_extract[j];

      var cur_elem_parsed = numeric(cur_elem);
      var next_elem_parsed = numeric(next_elem);

      // if the elements are the same, increment the index
      // and keep going
      if (cur_elem === next_elem) {
        index += cur_elem.length;
        continue;
      }

      // if either is a string, we can't expand, so just push it on the array and move on
      if (typeof cur_elem_parsed === 'string' || typeof next_elem_parsed === 'string') {
        push();
        break;
      }

      // at this point they are both numbers
      // see if cur is 1 below next
      if (cur_elem_parsed + 1 === next_elem_parsed) {
        // make sure the endings are the same
        var same = true;
        for (var k = j + 1; k < cur_extract.length; k++) {
          if (cur_extract[k] !== next_extract[k]) {
            same = false;
            break;
          }
        }

        if (same) {
          // can be collapsed!
          if (!obj) {
            var base = cur.substr(0, index);
            var suffix = cur.substr(index + cur_elem.length, cur.length);
            obj = {
              start: cur_elem_parsed,
              base: base,
              suffix: suffix,
            };
          }
          obj.end = next_elem_parsed;
          break;
        }
      }

      // nope, try again
      push();
      break;
    }
  }

  // cleanup remainder
  push();

  // final object
  return newarray.join(' ');
}

// break a string into sections
function extract(s) {
  return s.match(/([1-9][0-9]*|[^1-9]+0*)/g);
}

// try to cast to a number, return the number or just the string
function numeric(s) {
  var num = parseInt(s, 10);
  if (isNaN(num))
    return s;
  else
    return num;
}
