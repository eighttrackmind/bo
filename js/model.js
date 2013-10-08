// Generated by CoffeeScript 1.6.3
(function() {
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

}).call(this);
