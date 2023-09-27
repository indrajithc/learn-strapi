'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('map-field')
      .service('myService')
      .getWelcomeMessage();
  },
});
