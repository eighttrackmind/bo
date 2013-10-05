// Generated by CoffeeScript 1.6.3
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(function(require, exports, module) {
  var Model, View, izzy, _;
  izzy = require('izzy');
  Model = require('bo.model');
  _ = require('bo.util');
  return View = (function(_super) {
    __extends(View, _super);

    View.prototype.events = {};

    View.prototype.initialize = function() {};

    function View() {
      this.attachEvent = __bind(this.attachEvent, this);
      if (izzy.object(this.events)) {
        _.each(this.events, this.attachEvent);
      }
      if (izzy["function"](this.initialize)) {
        this.initialize.apply(this, arguments);
      }
    }

    View.prototype.attachEvent = function(fn, type) {
      var t, types, _i, _len, _results;
      types = type.split(' ');
      _results = [];
      for (_i = 0, _len = types.length; _i < _len; _i++) {
        t = types[_i];
        _results.push(document.addEventListener(t, this[fn]));
      }
      return _results;
    };

    return View;

  })(Model);
});
