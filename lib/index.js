'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lenses = exports.adt = undefined;

var _types = require('./types');

var _loop = function _loop(_key4) {
  if (_key4 === "default") return 'continue';
  Object.defineProperty(exports, _key4, {
    enumerable: true,
    get: function get() {
      return _types[_key4];
    }
  });
};

for (var _key4 in _types) {
  var _ret = _loop(_key4);

  if (_ret === 'continue') continue;
}

var _ramda = require('ramda');

var _loop2 = function _loop2(_key5) {
  if (_key5 === "default") return 'continue';
  Object.defineProperty(exports, _key5, {
    enumerable: true,
    get: function get() {
      return _ramda[_key5];
    }
  });
};

for (var _key5 in _ramda) {
  var _ret2 = _loop2(_key5);

  if (_ret2 === 'continue') continue;
}

var _matches = require('matches');

var _loop3 = function _loop3(_key6) {
  if (_key6 === "default") return 'continue';
  Object.defineProperty(exports, _key6, {
    enumerable: true,
    get: function get() {
      return _matches[_key6];
    }
  });
};

for (var _key6 in _matches) {
  var _ret3 = _loop3(_key6);

  if (_ret3 === 'continue') continue;
}

exports.dataConstructor = dataConstructor;

var _adt2 = require('adt');

var _adt = _interopRequireWildcard(_adt2);

var _lenses2 = require('lenses');

var _lenses = _interopRequireWildcard(_lenses2);

var _parser = require('./parser/parser');

var _parser2 = _interopRequireDefault(_parser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.adt = _adt;
exports.lenses = _lenses;
function dataConstructor(input) {
  var data = _adt.default.data;
  var newtype = _adt.default.newtype;
  var only = _adt.default.only;
  var record = _adt.default.record;
  var any = _adt.default.any;

  var AST = _parser2.default.parse(input);
  var result;
  var code = '\n    var ' + AST.type + ' = data(function(type) {\n      ' + AST.constructors.map(function (c) {
    return '\n        type(\'' + c.type + '\', record(function(field) {\n          ' + c.args.map(function (t) {
      return '\n            field(\'' + (t[0].toLowerCase() + t.slice(1)) + '\', any)\n          ';
    }).join("") + '\n        }))\n        ';
  }).join("") + '\n     })\n\n  result = ' + AST.type + '\n  ';
  eval(code);

  return result;
}