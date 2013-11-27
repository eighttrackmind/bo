// Generated by CoffeeScript 1.6.3
var Pane,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Pane = (function() {
  Pane.prototype.id = null;

  Pane.prototype.element = null;

  function Pane(options) {
    var element, html, idAttr;
    this.options = options;
    this.clearAnimation = __bind(this.clearAnimation, this);
    ++this.factory.counter;
    element = this.options.element;
    html = this.options.html;
    idAttr = element ? element.getAttribute(this.options.paneAttribute) : void 0;
    this.id = this.options.id || idAttr || this.factory.id();
    this.element = element || this.factory.create();
    this.index = this.options.index || this.factory.counter;
    this.element.setAttribute(this.options.paneAttribute, this.id);
    if (html) {
      this.element.innerHTML = html;
    }
  }

  Pane.prototype.factory = {
    counter: 0,
    create: function() {
      var element;
      console.log('create', this.id, this);
      element = document.createElement('div');
      element.setAttribute('data-bo-pane', this.id());
      document.body.appendChild(element);
      return element;
    },
    id: function() {
      return "pane-" + this.counter;
    }
  };

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
