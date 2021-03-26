#!/usr/bin/env node
/**
 * simple CLI program to turn stdin into a brace-compressed string
 *
 * Author: Dave Eddy <dave@daveeddy.com>
 * Date: April 29, 2015
 * License: MIT
 */

var fs = require('fs');

var compress = require('../');

var input = fs.readFileSync('/dev/stdin', 'utf8').trim().split('\n');

console.log(compress(input).join(' '));
