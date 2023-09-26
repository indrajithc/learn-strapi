"use strict";

module.exports = {

  async find(ctx) {
    try {
      return await strapi.plugin("todo").service("todo").find(ctx.query);
    } catch (error) {
      ctx.trow(500, error);
    }
  }

};