// Generated by CoffeeScript 1.6.3
var __slice = [].slice;

define(function(require, exports, module) {
  var Util;
  return Util = {
    each: function(collection, fn) {
      var key, value, _results;
      if (collection.forEach) {
        return collection.forEach(fn);
      } else {
        _results = [];
        for (key in collection) {
          value = collection[key];
          _results.push(fn(value, key));
        }
        return _results;
      }
    },
    extend: function() {
      var key, obj, other, others, _i, _len;
      obj = arguments[0], others = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (!obj) {
        throw new TypeError('extend expects argument 0 to be an Object');
      }
      if (others) {
        for (_i = 0, _len = others.length; _i < _len; _i++) {
          other = others[_i];
          for (key in other) {
            obj[key] = other[key];
          }
        }
      }
      return obj;
    },
    fluent: function(fn) {
      return function() {
        fn.apply(this, arguments);
        return this;
      };
    },
    one: function(collection) {
      var id;
      for (id in collection) {
        return id;
      }
    }
  };
});
