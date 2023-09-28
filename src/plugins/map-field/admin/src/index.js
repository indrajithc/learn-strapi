import { prefixPluginTranslations } from '@strapi/helper-plugin';
import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import Initializer from './components/Initializer';
import PluginIcon from './components/PluginIcon';
import MapInput from './components/MapInput';
import mutateEditViewHook from "./mutateEditViewHook";
import get from 'lodash/get';

import cellFormatter from './components/cellFormatter';

const name = pluginPkg.strapi.name;

export default {
  register(app) {
    app.addFields({
      type: pluginId,
      Component: MapInput
    });
    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    });
  },

  bootstrap(app) {
    app.registerHook(
      "Admin/CM/pages/EditView/mutate-edit-view-layout",
      mutateEditViewHook
    );

    app.registerHook(
      'Admin/CM/pages/ListView/inject-column-in-table',
      ({ displayedHeaders, layout }) => {
        console.log({ displayedHeaders, layout })
        const isFieldLocalized = get(
          layout,
          'contentType.pluginOptions.i18n.localized',
          false
        );
        // if (!isFieldLocalized) {
        //   return { displayedHeaders, layout };
        // }

        console.log({
          layout,
          displayedHeaders: [
            ...displayedHeaders,
            {
              key: '__locale_key__', // Needed for the table
              fieldSchema: { type: 'string' }, // Schema of the attribute
              metadatas: {
                label: 'Content available in', // Label of the header,
                sortable: true | false, // Define if the column is sortable
              }, // Metadatas for the label
              // Name of the key in the data we will display
              name: 'locales',
              // Custom renderer: props => Object.keys(props).map(key => <p key={key}>key</p>)
              cellFormatter,
            },
          ],
        })
        return {
          layout,
          displayedHeaders: [
            ...displayedHeaders,
            {
              key: '__locale_key__', // Needed for the table
              fieldSchema: { type: 'string' }, // Schema of the attribute
              metadatas: {
                label: 'Content available in', // Label of the header,
                sortable: true | false, // Define if the column is sortable
              }, // Metadatas for the label
              // Name of the key in the data we will display
              name: 'locales',
              // Custom renderer: props => Object.keys(props).map(key => <p key={key}>key</p>)
              cellFormatter,
            },
          ],
        };
      }
    );
  },
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(
          /* webpackChunkName: "translation-[request]" */ `./translations/${locale}.json`
        )
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
