#!/usr/bin/env node

var assert = require('assert');

var brace = require('./');

var tests = [
    {
        input: ['1', '2', '3'],
        output: ['{1..3}']
    },
    {
        input: ['01', '02', '03'],
        output: ['0{1..3}']
    },
    {
        input: ['1', '2', '3', '5', '6'],
        output: ['{1..3}', '{5..6}']
    },
    {
        input: ['1', '2', '3', '5', '7'],
        output: ['{1..3}', '5', '7']
    },
    { // input must be sorted first, cannot go backwards
        input: ['5', '4', '3', '2', '1'],
        output: ['5', '4', '3', '2', '1']
    },
    {
        input: ['1a', '2a', '3a'],
        output: ['{1..3}a']
    },
    {
        input: ['1a', '2b', '3c'],
        output: ['1a', '2b', '3c']
    },
    {
        input: ['a1', 'b2', 'c3'],
        output: ['a1', 'b2', 'c3']
    },
    {
        input: ['foo-01', 'foo-02', 'foo-03'],
        output: ['foo-0{1..3}']
    },
    {
        input: ['foo-01-bar-01', 'foo-02-bar-01', 'foo-03-bar-01'],
        output: ['foo-0{1..3}-bar-01']
    },
    {
        input: ['foo-01-bar-01', 'foo-02-bar-01', 'foo-03-bar-01', 'foo-01-bar-02', 'foo-02-bar-02', 'foo-03-bar-02'],
        output: ['foo-0{1..3}-bar-01', 'foo-0{1..3}-bar-02']
    },
    {
        input: ['foo-01', 'foo-02-bar', 'foo-03-bar-baz'],
        output: ['foo-01', 'foo-02-bar', 'foo-03-bar-baz']
    },
    {
        input: ['a1', 'a1a', 'a1a1'],
        output: ['a1', 'a1a', 'a1a1']
    },
    {
        input: ['a1', 'a2', 'a3a'],
        output: ['a{1..2}', 'a3a']
    },
    {
        input: ['001', '002', '004', '005', '007-a', '007-b', '007-c', '008-a', '008-b-1'],
        output: ['00{1..2}', '00{4..5}', '007-a', '007-b', '007-c', '008-a', '008-b-1']
    },
    {
        input: ['0011', '0012', '0013'],
        output: ['00{11..13}']
    },
    { // spaces aren't special
        input: ['foo bar 1', 'foo bar 2', 'foo bar 3'],
        output: ['foo bar {1..3}']
    },
];

tests.forEach(function(test) {
    console.log('testing [%s] => %s', test.input.join(', '), test.output);
    var braced = brace(test.input);
    assert.deepEqual(braced, test.output);
});
