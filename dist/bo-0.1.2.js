/*
 * Sparkplug.js - Tiny initializer for AMD modules
 * 
 * Public Domain. Use, modify and distribute it any way you like. No attribution required.
 *
 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
 *
 * Sparkplug.js is a very small implementation of the AMD specification. It does not load asynchronously,
 * but expects modules to be in the same source. See README.md for more or visit
 * https://github.com/timjansen/sparkplug.js 
 */
// ==ClosureCompiler==
// @output_file_name sparkplug.min.js
// @compilation_level ADVANCED_OPTIMIZATIONS
// ==/ClosureCompiler==

(function(_window) {
	var RECURSION_DEPTH = 32;  // maximum recursion depth for dependencies
	var REQUIRE = 'require';         
	var EXPORTS = 'exports';
	var MODULE = 'module';
	var modules = {}; // stores id -> {d: ['dependency', 'dependency'], f: factoryfunction(){}, x: {exports}, l: <loadingflag>}
	var anonymousIdIndex = 0;   // provides names for anonymous modules
	var amd = {'ids':[], 'anonIds': []};       // define.amd content

	function isType(s,o) {
		return typeof s == o;
	}
	function isString(s) {
		return isType(s, 'string');
	}
	function isFunction(f) {
		return isType(f, 'function');
	}
	function isList(v) {
		return v && v.length != null && !isString(v) && !isFunction(v);
	}
	
	function each(list, f) {
		for (var i = 0; i < list.length; i++)
			f(list[i], i);
	}
	
	function resolvePath(path, base) {
		if (/^\.\.?\//.test(path))  {
			var step;
			var newPath = base.split('/');
			newPath.pop();
			each(path.split('/'), function(step) {
				if (step == '..')
					newPath.pop();
				else if (step != '' && step != '.')
					newPath.push(step);
			});
			return newPath.join('/');
		}
		else
			return path;
	}

	function requireInternal(id, baseId, recursionsLeft) { 
		var modDepExports = [];  // array corresponding to mod.d, containing resolved dependencies
		var topLevelId = resolvePath(id, baseId);
		var mod = modules[topLevelId];
		var modulesObj = {'id': topLevelId, 'exports': {}};

		each(amd['anonIds'], function(anonId, i) {
			if (topLevelId == anonId)
				mod = modules[i];
		});	
		if (!mod || mod['l'] || !recursionsLeft)
			throw new Error(mod ? 'Circular Deps' : 'Cant find '+id);
		if (mod['x'])
			return mod['x'];
		
		each(mod['d'], function(modDepId, i) {
			if (modDepId == REQUIRE)
				modDepExports[i] = createExportRequire(topLevelId); 
			else if (modDepId == EXPORTS)
				modDepExports[i] = modulesObj[EXPORTS];
			else if (modDepId == MODULE)
				modDepExports[i] = modulesObj;
			else
				modDepExports[i] = requireInternal(modDepId, topLevelId, recursionsLeft-1);
		});

		mod['l'] = 1;
		mod['x'] = isFunction(mod['f']) ? (mod['f'].apply(_window, modDepExports) || modulesObj[EXPORTS]) : mod['f'];
		mod['l'] = 0;
		return mod['x'];
	}

	function createExportRequire(baseId) {
		function r(id, callback) { 
			if (isList(id)) {
				var deps = [];
				each(id, function(dep) {
					deps.push(r(dep));
				});
				if (isFunction(callback))
					callback.apply(_window, deps);
			} 
			else
				return requireInternal(id, baseId, RECURSION_DEPTH); 
		};
		r['toUrl'] = function(id) { return resolvePath(id, baseId); };
		return r;
	}
	
	(_window['define'] = function(id, dependencies) { // third arg is factory, but accessed using arguments..
		var realId = isString(id) ? id : anonymousIdIndex++;
		amd['ids'].push(realId);
		modules[realId] = {
				'd': isList(id) ? id : (isList(dependencies) ? dependencies : [REQUIRE, EXPORTS, MODULE]),  // dependencies
				'f': arguments[arguments.length-1] // factory
		};
	})['amd'] = amd;
	
	_window[REQUIRE] = createExportRequire('');
})(this);



// Generated by CoffeeScript 1.6.3
var extend, izzy, izzyFn, umd;

umd = function(factory) {
  if (typeof exports === 'object') {
    return module.exports = factory;
  } else if (typeof define === 'function' && define.amd) {
    return define('izzy', function() {
      return factory;
    });
  } else {
    return this.izzy = factory;
  }
};

extend = function(a, b) {
  var key;
  for (key in b) {
    a[key] = b[key];
  }
  return a;
};

izzy = {
  array: function(thing) {
    return !izzy.string(thing) && !izzy.number(thing) && izzy.object(thing) && izzy.defined(thing.length);
  },
  boolean: function(thing) {
    return typeof thing === 'boolean';
  },
  defined: function(thing) {
    return thing !== void 0;
  },
  "function": function(thing) {
    return typeof thing === 'function';
  },
  "null": function(thing) {
    return thing === null;
  },
  number: function(thing) {
    return typeof thing === 'number';
  },
  object: function(thing) {
    return typeof thing === 'object';
  },
  string: function(thing) {
    return typeof thing === 'string';
  }
};

izzyFn = function(type, thing) {
  if (izzy.defined(izzy[type])) {
    return izzy[type](thing);
  } else {
    return void 0;
  }
};

extend(izzyFn, izzy);

umd(izzyFn);

// Generated by CoffeeScript 1.6.3
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  define('bo', function() {
    var Bo, Model, Pane, View, _, _ref;
    Model = require('model');
    View = require('view');
    Pane = require('pane');
    _ = require('util');
    return Bo = (function(_super) {
      __extends(Bo, _super);

      function Bo() {
        this.click = __bind(this.click, this);
        this.registerPane = __bind(this.registerPane, this);
        _ref = Bo.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Bo.prototype.options = {
        animationDuration: 200,
        paneAttribute: 'data-bo-pane',
        paneTriggerAttribute: 'data-bo-trigger-pane'
      };

      Bo.prototype.events = {
        'touchstart click': 'click'
      };

      Bo.prototype.panes = {};

      Bo.prototype.initialize = function() {
        var panes;
        panes = document.querySelectorAll('[' + this.options.paneAttribute + ']');
        _.each(panes, this.registerPane);
        this.hideAll();
        return this.show(_.one(this.panes));
      };

      Bo.prototype.registerPane = function(element) {
        var opts, pane;
        if (typeof element === 'String' || typeof element === 'Number') {
          opts = {
            id: element
          };
        } else {
          opts = {
            element: element
          };
        }
        opts = _.extend(opts, this.options);
        pane = new Pane(opts);
        return this.panes[pane.id] = pane;
      };

      Bo.prototype.iterate = function(fn) {
        return _.each(this.panes, fn);
      };

      Bo.prototype.hideAll = function() {
        return this.iterate(function(pane) {
          return pane.right(true);
        });
      };

      Bo.prototype.restToLeft = function(index) {
        return this.iterate(function(pane) {
          if (pane.index < index) {
            return pane.left(true);
          }
        });
      };

      Bo.prototype.restToRight = function(index) {
        return this.iterate(function(pane) {
          if (pane.index > index) {
            return pane.right(true);
          }
        });
      };

      Bo.prototype.show = function(id) {
        var index, newPane, oldPane;
        newPane = this.panes[id];
        oldPane = this.get('active');
        if (!newPane) {
          throw new Error('Pane with ID "' + id + '" does not exist in the DOM, or is not registered with Bo.');
        }
        if (oldPane) {
          index = newPane.index;
          if (index > oldPane.index) {
            oldPane.left();
            newPane.right(true).show();
            this.restToLeft(index);
          } else {
            oldPane.right();
            newPane.left(true).show();
            this.restToRight(index);
          }
        } else {
          newPane.show(true);
        }
        return this.set('active', newPane);
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

    })(View);
  });

  define('model', function() {
    var Model;
    return Model = (function() {
      function Model() {}

      Model.prototype.data = {};

      Model.prototype.get = function(key) {
        return this.data[key];
      };

      Model.prototype.set = function(key, value) {
        return this.data[key] = value;
      };

      Model.prototype.push = function(key, value, index) {
        var array;
        array = this.data[key] || (this.data[key] = {});
        if (index) {
          return array[+index] = value;
        } else {
          return array.push(value);
        }
      };

      return Model;

    })();
  });

  define('pane', function() {
    var Pane, makeId, makePane, paneIdCounter, _;
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
    return Pane = (function() {
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

  define('util', function() {
    var izzy, util;
    izzy = require('izzy');
    return util = {
      each: function(collection, fn) {
        var key, value, _i, _len, _results, _results1;
        if (izzy.array(collection)) {
          _results = [];
          for (key = _i = 0, _len = collection.length; _i < _len; key = ++_i) {
            value = collection[key];
            _results.push(fn(value, key));
          }
          return _results;
        } else if (izzy.object(collection)) {
          _results1 = [];
          for (key in collection) {
            value = collection[key];
            _results1.push(fn(value, key));
          }
          return _results1;
        }
      },
      extend: function() {
        var key, obj, other, others, _i, _len;
        obj = arguments[0], others = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        if (obj && others) {
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

  define('view', function() {
    var Model, View, izzy, _;
    izzy = require('izzy');
    Model = require('model');
    _ = require('util');
    return View = (function(_super) {
      __extends(View, _super);

      View.prototype.element = document;

      View.prototype.events = {};

      View.prototype.initialize = function() {};

      function View() {
        var args, element;
        element = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        this.attachEvent = __bind(this.attachEvent, this);
        if (element instanceof Element) {
          this.element = element;
        }
        if (izzy.object(this.events)) {
          _.each(this.events, this.attachEvent);
        }
        if (izzy["function"](this.initialize)) {
          this.initialize.apply(this, args);
        }
      }

      View.prototype.attachEvent = function(fn, type) {
        var t, types, _i, _len, _results;
        types = type.split(' ');
        _results = [];
        for (_i = 0, _len = types.length; _i < _len; _i++) {
          t = types[_i];
          _results.push(this.element.addEventListener(t, this[fn]));
        }
        return _results;
      };

      return View;

    })(Model);
  });

}).call(this);