(function (exports) {

  var $ = document.querySelectorAll.bind(document);

  // @options object
  var DataBinder = function ( options ) {

    var config = {
      template: 'singleBrackets'
    };

    helpers.extend(config, options);

    this.$el = $(config.el)[0];
    this.model = {};
    this.template = config.template;
    this.regexp = /(?:\{)(?:[^\}]*)(?:\})/gm; // { anything }
    this.templateString = this.$el.innerHTML;

    this.update(config.model);
  };

  // @model object
  DataBinder.prototype.update = function (model) {
    helpers.extend(this.model, model);

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