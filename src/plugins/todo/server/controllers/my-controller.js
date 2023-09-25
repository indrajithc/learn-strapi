'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('todo')
      .service('myService')
      .getWelcomeMessage();
  },
});
