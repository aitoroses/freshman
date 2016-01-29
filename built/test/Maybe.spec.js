"use strict";
var test = require('tape');
var a = require('../../lib');
var Maybe = a.Maybe, add = a.add, prop = a.prop, compose = a.compose;
var match = function (a) { return function (b) { return b.match(a); }; };
test('Maybe#map', function (t) {
    var res1 = Maybe.of("Malkovich Malkovich").map(match(/a/ig));
    t.equal(res1.toString(), 'Maybe.Just(a,a)');
    t.equal(res1.isNothing, false);
    t.equal(res1.isJust, true);
    t.deepEqual(res1.get(), ['a', 'a']);
    var res2 = Maybe.fromNullable(null).map(match(/a/ig));
    t.equal(res2.toString(), 'Maybe.Nothing');
    t.equal(res2.isNothing, true);
    t.equal(res2.isJust, false);
    t.throws(function () { return res2.get(); });
    var res3 = Maybe.of({ name: "Boris" })
        .map(prop("age"))
        .map(add(10));
    t.equal(res3.toString(), 'Maybe.Nothing');
    t.equal(res3.isNothing, true);
    t.equal(res3.isJust, false);
    t.throws(function () { return res3.get(); });
    var res4 = Maybe.fromNullable({ name: "Dinah", age: 14 })
        .map(prop("age"))
        .map(add(10));
    t.equal(res4.toString(), 'Maybe.Just(24)');
    t.equal(res4.isNothing, false);
    t.equal(res4.isJust, true);
    t.equal(res4.get(), 24);
    t.end();
});
