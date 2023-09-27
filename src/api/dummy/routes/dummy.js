'use strict';

/**
 * dummy router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::dummy.dummy');
