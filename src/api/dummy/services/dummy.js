'use strict';

/**
 * dummy service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::dummy.dummy');
