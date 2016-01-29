import Maybe from 'data.maybe'
export Either from 'data.either'
export Task from 'data.task'

// Reimplement Just#map method
Maybe.of = function(a) {
  return a != null ? Maybe.prototype.Just(a) : Maybe.prototype.Nothing()
}
Maybe.prototype.of = Maybe.of

export {Maybe}
