'use strict';

/**
 * dummy controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::dummy.dummy');
