// Generated by CoffeeScript 1.6.3
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(function(require, exports, module) {
  var Bo, Model, Pane, extend, one;
  Model = require('bo.model');
  Pane = require('bo.pane');
  extend = function(one, two) {
    var key, val, _i, _len;
    for (val = _i = 0, _len = two.length; _i < _len; val = ++_i) {
      key = two[val];
      one[key] = two[key];
    }
    return one;
  };
  one = function(obj) {
    var id;
    for (id in obj) {
      return id;
    }
  };
  return Bo = (function() {
    Bo.prototype.options = {
      animationDuration: 200,
      paneAttribute: 'data-bo-pane',
      paneTriggerAttribute: 'data-bo-trigger-pane'
    };

    Bo.prototype.panes = {};

    Bo.prototype.state = new Model;

    function Bo() {
      this.click = __bind(this.click, this);
      var element, n, panes, _i, _len;
      panes = document.querySelectorAll('[' + this.options.paneAttribute + ']');
      for (n = _i = 0, _len = panes.length; _i < _len; n = ++_i) {
        element = panes[n];
        this.registerPane(element, n);
      }
      this.show(one(this.panes));
      document.addEventListener('click', this.click);
    }

    Bo.prototype.registerPane = function(element, index) {
      var opts, pane;
      if (typeof element === 'String' || typeof element === 'Number') {
        opts = {
          id: element
        };
      } else {
        opts = {
          element: element,
          index: index
        };
      }
      opts = extend(opts, this.options);
      pane = new Pane(opts);
      return this.panes[pane.id] = pane;
    };

    Bo.prototype.hideAll = function() {
      var id, pane, _ref, _results;
      _ref = this.panes;
      _results = [];
      for (id in _ref) {
        pane = _ref[id];
        _results.push(pane.right());
      }
      return _results;
    };

    Bo.prototype.show = function(id) {
      this.hideAll();
      this.panes[id].show();
      return this.state.set('active', id);
    };

    Bo.prototype.click = function(event) {
      var id;
      id = event.target.getAttribute(this.options.paneTriggerAttribute);
      if (id) {
        event.preventDefault();
        return this.show(id);
      }
    };

    return Bo;

  })();
});
