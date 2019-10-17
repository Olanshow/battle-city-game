;(function () {
  'use strict'

  class Sprite {
    constructor(texture,
      { x = 0, y = 0,
        width, height,
        anchorX = 0, anchorY = 0,
        scale = 1,
        frame = {} } = {}) {

      this.texture = texture;

      this.frame = {
        x: frame.x || 0,
        y: frame.y || 0,
        width: frame.width || this.texture.width,
        height: frame.height || this.texture.height,
      };

      this.x = x;
      this.y = y;
      this.anchorX = anchorX;
      this.anchorY = anchorY;
      this.width = width || this.frame.width;
      this.height = height || this.frame.height;

      this.setScale(scale);
    }

    setScale(val) {
      this.scaleX = val;
      this.scaleY = val;
    }

    get absoluteX() {
      return this.x - this.anchorX * this.width;
    }

    set absoluteX(val) {
      this.x = val + this.anchorX * this.width;
      return val;
    }

    get absoluteY() {
      return this.y - this.anchorY * this.height;
    }

    set absoluteY(val) {
      this.x = val + this.anchorX * this.height;
      return val;
    }

    get scaleX() {
      return this.width / this.frame.width;
    }

    set scaleX(val) {
      this.width = this.frame.width * val;
      return val;
    }

    get scaleY() {
      return this.height / this.frame.height;
    }

    set scaleY(val) {
      this.height = this.frame.height * val;
      return val;
    }

    draw(canvas, ctx) {
      ctx.drawImage(
        this.texture,

        this.frame.x,
        this.frame.y,
        this.frame.width,
        this.frame.height,

        this.absoluteX,
        this.absoluteY,
        this.width,
        this.height,
      )
    }
  }

  window.GameEngine = window.GameEngine || {};
  window.GameEngine.Sprite = Sprite;

})();