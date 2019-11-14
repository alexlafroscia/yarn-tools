"use strict";

const EmberApp = require("ember-cli/lib/broccoli/ember-app");
const isProduction = EmberApp.env() === "production";

const purgeCSS = {
  module: require("@fullhuman/postcss-purgecss"),
  options: {
    content: [
      "./app/index.html",
      "./app/components/**/*.hbs",
      "./app/templates/**/*.hbs"
    ],
    defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
  }
};

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    // Add options here
    autoImport: {
      webpack: {
        node: {
          crypto: true,
          fs: "empty"
        }
      }
    },

    babel: {
      plugins: [
        "@babel/plugin-proposal-optional-chaining",
        "@babel/plugin-proposal-nullish-coalescing-operator",
        require.resolve("ember-auto-import/babel-plugin")
      ]
    },

    fathom: {
      isEnabled: isProduction,
      siteId: "GMENSDWN"
    },

    postcssOptions: {
      compile: {
        plugins: [
          require("postcss-import"),
          require("tailwindcss")("./config/tailwind.js"),
          ...(isProduction ? [purgeCSS] : [])
        ]
      }
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
