// Generated by CoffeeScript 1.6.3
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(function(require, exports, module) {
  var Bo, makeId, makePane, paneIdCounter, _;
  Bo = require('bo');
  _ = require('util');
  paneIdCounter = 0;
  makePane = function(id) {
    var element;
    element = document.createElement('div');
    element.setAttribute('data-bo-pane', id);
    document.body.appendChild(element);
    return element;
  };
  makeId = function(counter) {
    return 'pane' + counter;
  };
  return Bo.Pane = (function() {
    Pane.prototype.id = null;

    Pane.prototype.element = null;

    function Pane(options) {
      var element, html, idAttr;
      this.options = options;
      this.clearAnimation = __bind(this.clearAnimation, this);
      ++paneIdCounter;
      element = this.options.element;
      html = this.options.html;
      idAttr = element ? element.getAttribute('data-bo-pane') : void 0;
      this.id = this.options.id || idAttr || makeId(paneIdCounter);
      this.element = element || makePane(this.id);
      this.index = this.options.index || paneIdCounter;
      this.element.setAttribute('data-bo-pane', this.id);
      if (html) {
        this.element.innerHTML = html;
      }
    }

    Pane.prototype.clearAnimation = function() {
      return this.element.classList.remove('animate');
    };

    Pane.prototype.animate = function(instant) {
      if (!instant) {
        this.element.classList.add('animate');
        return setTimeout(this.clearAnimation, this.options.animationDuration);
      }
    };

    Pane.prototype.left = _.fluent(function(instant) {
      this.animate(instant);
      this.element.classList.remove('right');
      return this.element.classList.add('left');
    });

    Pane.prototype.right = _.fluent(function(instant) {
      this.animate(instant);
      this.element.classList.remove('left');
      return this.element.classList.add('right');
    });

    Pane.prototype.show = _.fluent(function(instant) {
      this.animate(instant);
      this.element.classList.remove('left');
      return this.element.classList.remove('right');
    });

    return Pane;

  })();
});
