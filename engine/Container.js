;(function () {
  'use strict'

  class Container {
    constructor(texture) {
      this.displayObjects = [];
    }

    add(displayObject) {
      if(!this.displayObjects.includes(displayObject))
        this.displayObjects.push(displayObject);
    }

    remove() {

    }

    draw(canvas, ctx) {
      for(let displayObject of this.displayObjects) {
        displayObject.draw(canvas, ctx);
      }
    }
  }

  window.GameEngine = window.GameEngine || {};
  window.GameEngine.Container = Container;

})();