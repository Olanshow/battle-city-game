;!function () {
  'use strict'

  class Loader {
    constructor() {
      this.loadOrder = {
        images: [],
        jsons: [],
      }

      this.resourses = {
        images: {},
        jsons: {},
      }
    }

    addImage(name, src) {
      this.loadOrder.images.push({
        name,
        src,
      })
    }

    addJson(name, url) {
      this.loadOrder.jsons.push({
        name,
        url,
      })
    }

    load(callback) {
      let imagesLoad = this.loadOrder.images;
      let jsonLoad = this.loadOrder.jsons;
      let promises = [];

      for (let val of imagesLoad) {
        let promise = Loader.loadImage(val.src)
          .then((image) => {
            this.resourses.images[val.name] = image;
            let key = imagesLoad.indexOf(val);

            key != -1 ? imagesLoad.splice(key, 1) : null;
          })

        promises.push(promise);
      }

      for (let val of jsonLoad) {
        let promise = Loader.loadJson(val.url)
          .then((data) => {
            this.resourses.jsons[val.name] = data;
            let key = jsonLoad.indexOf(val);

            key != -1 ? jsonLoad.splice(key, 1) : null;
          })

        promises.push(promise);
      }

      Promise.all(promises)
        .then(callback);
    }

    static loadImage(srs) {
      return new Promise((resolve, reject) => {
        try {
          const image = new Image();
          image.onload = () => resolve(image);
          image.src = srs;
        } catch (error) {
          reject(error);
        }
      })
    }

    static loadJson(url) {
      return new Promise((resolve, reject) => {
        fetch(url)
          .then((req) => req.json())
          .then((data) => resolve(data))
          .catch((error) => reject(error));
      })
    }
  }

  window.GameEngine = window.GameEngine || {};
  window.GameEngine.Loader = Loader;

}();