'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Maybe = exports.Task = exports.Either = undefined;

var _data = require('data.maybe');

var _data2 = _interopRequireDefault(_data);

var _data3 = require('data.either');

var _data4 = _interopRequireDefault(_data3);

var _data5 = require('data.task');

var _data6 = _interopRequireDefault(_data5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Either = _data4.default;
exports.Task = _data6.default;

// Reimplement Just#map method

_data2.default.of = function (a) {
  return a != null ? _data2.default.prototype.Just(a) : _data2.default.prototype.Nothing();
};
_data2.default.prototype.of = _data2.default.of;

exports.Maybe = _data2.default;