# DataBinder
A small and pretty simple tool for data binding. No dependencies, written in pure JavaScript, supports IE9+.

## Usage
[Visit CodePen demo](http://codepen.io/andrew-r/pen/GJYjYa)

## API
```javascript
// creating new instance of DataBinder

var config = {
  // string
  // selector that specifies the DOM element to bind
  el: '.widget__title',

  // object
  // specifies the data to bind
  model: {},

  // object
  // specifies callbacks that will be called after initializing, updating or rendering
  // all callbacks have access to current DataBinder instance by using `this` keyword
  callbacks: {
    onInit:   function() {},
    onUpdate: function(changes) {
      // some manipulations with changes object
      return changes;
    },
    onRender: function() {}
  }
}

var binding = new DataBinder(config);

// updating the model
// will cause rendering immediately
binding.update({
  title: 'Ads'
});

// rendering the model
// useless because of automatic calling of this method immediately after updating the model
binding.render();
```

## License
Released under the MIT License.

```
The MIT License (MIT)

Copyright © 2015 Andrew Romanov

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```