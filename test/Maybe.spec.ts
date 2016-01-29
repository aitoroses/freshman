import * as test from 'tape'
import * as F from 'freshman'

let a: typeof F = require('../../lib')

const {Maybe, add, prop, compose} = a

const match = (a: RegExp) => (b: string) => b.match(a)

test('Maybe#map', t => {

  //t.plan(2)

  let res1 = Maybe.of("Malkovich Malkovich").map(match(/a/ig))
  //=> Maybe(['a', 'a'])
  t.equal(res1.toString(), 'Maybe.Just(a,a)')
  t.equal(res1.isNothing, false)
  t.equal(res1.isJust, true)
  t.deepEqual(res1.get(), ['a', 'a'])

  let res2 = Maybe.fromNullable(null).map(match(/a/ig))
  //=> Maybe(null)
  t.equal(res2.toString(), 'Maybe.Nothing')
  t.equal(res2.isNothing, true)
  t.equal(res2.isJust, false)
  t.throws(() => res2.get())

  let res3 = Maybe.of({name: "Boris"})
    .map(prop("age"))
    .map(add(10))
  //=> Maybe(null)
  t.equal(res3.toString(), 'Maybe.Nothing')
  t.equal(res3.isNothing, true)
  t.equal(res3.isJust, false)
  t.throws(() => res3.get())

  let res4 = Maybe.fromNullable({name: "Dinah", age: 14})
   .map(prop("age"))
   .map(add(10))
  //=> Maybe(24)
  t.equal(res4.toString(), 'Maybe.Just(24)')
  t.equal(res4.isNothing, false)
  t.equal(res4.isJust, true)
  t.equal(res4.get(), 24)

  t.end()
})
