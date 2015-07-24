(function (exports) {

  var $ = document.querySelectorAll.bind(document);

  var DataBinder = function (config) {
    var callbacks = config.callbacks;

    for (callback in callbacks) {
      if (config.callbacks.hasOwnProperty(callback)) {
        if (typeof callbacks[callback] === 'function') {
          this[callback] = callbacks[callback];
        }
      }
    }

    this.$el = $(config.el)[0];
    this.model = {};
    this.regexp = /(?:\{)(?:[^\}]*)(?:\})/gm; // { anything }
    this.templateString = this.$el.innerHTML;

    if (this.onInit) {
      this.onInit();
    }

    // update the model initially
    this.update(config.model);
  };


  DataBinder.prototype.update = function (changes) {
    if (this.onUpdate) {
      changes = this.onUpdate(changes);
    }

    helpers.extend(this.model, changes);

    // render immediately after changes to the model
    this.render();
  };


  DataBinder.prototype.render = function () {
    var self, props, renderedString;

    self = this;
    renderedString = this.templateString;
    props = renderedString.match(this.regexp);

    props.forEach(function(prop) {
      var key = prop.replace(new RegExp(' ', 'g'), '').replace('{', '').replace('}', '');

      renderedString = renderedString.replace(prop, self.model[key]);
    });

    this.$el.innerHTML = renderedString;

    if (!this.isRendered) {
      this.isRendered = true;
      
      [].slice.call($('[data-template]')).forEach(function(element) {
        element.removeAttribute('data-template');
      });
    }

    if (this.onRender) {
      this.onRender();
    }
  }

  exports.DataBinder = DataBinder;

  var helpers = {
    extend: function(defaultObject, modifiedObject) {

      for (var key in modifiedObject) {
        if (modifiedObject.hasOwnProperty(key)) {
          if (modifiedObject[key] !== undefined) {
            defaultObject[key] = modifiedObject[key];
          }
        }
      }

      return defaultObject;
    }
  }

})(window);