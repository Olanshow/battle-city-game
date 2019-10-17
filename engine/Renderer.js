;(function () {
  'use strict'

  class Renderer {
    constructor({ width = 100, height = 100, background = '#999', update = () => {} } = {}) {
      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');

      this.canvas.width = width;
      this.canvas.height = height;
      this.background = background
      this.update = update;

      this.stage = new GameEngine.Container();

      requestAnimationFrame(timestamp => this.tick(timestamp));
    }

    get displayObjects() {
      return _getDisplayObjects(this.stage)

      function _getDisplayObjects(container, result = []) {
        for(let displayObject of container.displayObjects) {
          if(displayObject instanceof GameEngine.Container)
            _getDisplayObjects(displayObject, result);
          else
            result.push(displayObject);
        }

        return result;
      }
    }

    tick(timestamp) {
      this.update(timestamp);
      this.clear();
      this.render();

      requestAnimationFrame(timestamp => this.tick(timestamp));
    }

    render() {
      this.stage.draw(this.canvas, this.ctx);
    }

    clear() {
      this.ctx.fillStyle = this.background;
      this.ctx.beginPath();
      this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.fill();
    }
  }

  window.GameEngine = window.GameEngine || {};
  window.GameEngine.Renderer = Renderer;

})();