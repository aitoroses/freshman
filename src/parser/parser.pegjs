DataType "data keyword"
 = _ "data" _ data:Identifier _ "=" _ c:ConstructorGroup _ { 
  return {type: data, constructors: c} 
}
 
Guard "guard"
 = _ "|" _ { return "GUARD" }
 
ConstructorGroup "constructor group"
 = c:Constructor cs:(Guard Constructor)* { 
   return cs.reduce(function(acc, i) {
    acc.push(i[1])
    return acc
   }, [].concat(c))
  }

Constructor "constructor"
 = name:Identifier tail:(_ Identifier)* {
 	return {
    	type: name,
        args: tail.map(function(x) {return x[1]})
          
    }
 }

Identifier "identifier"
 = [A-Z][a-zA-Z0-1]* { return text() }

_ "whitespace"
  = [ \t\n\r]* { return "WS" }
