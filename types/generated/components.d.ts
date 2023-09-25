import type { Schema, Attribute } from '@strapi/strapi';

export interface CarousalbannersBanner2 extends Schema.Component {
  collectionName: 'components_carousalbanners_banner_2s';
  info: {
    displayName: 'banner 2';
  };
  attributes: {
    title: Attribute.String;
  };
}

export interface CarousalbannersBanner extends Schema.Component {
  collectionName: 'components_carousalbanners_banners';
  info: {
    displayName: 'Banner';
  };
  attributes: {
    title: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 100;
      }>;
    bannerImage: Attribute.Media;
  };
}

declare module '@strapi/strapi' {
  export module Shared {
    export interface Components {
      'carousalbanners.banner-2': CarousalbannersBanner2;
      'carousalbanners.banner': CarousalbannersBanner;
    }
  }
}
