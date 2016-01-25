export * from './types'
export * from 'ramda'
export * as adt from 'adt'
export * from 'matches'
export * as lenses from 'lenses'

import parser from './parser/parser'
import adt from 'adt'

export function dataConstructor(input) {
  const {data, newtype, only, record, any} = adt
  const AST = parser.parse(input)
  var result
  let code = `
    var ${AST.type} = data(function(type) {
      ${AST.constructors.map((c) => `
        type('${c.type}', record(function(field) {
          ${c.args.map((t) => `
            field('${t[0].toLowerCase() + t.slice(1)}', any)
          `).join("")}
        }))
        `
      ).join("")}
     })

  result = ${AST.type}
  `
  eval(code)

  return result
}
