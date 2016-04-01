/* jshint node: true */
'use strict';

var path = require('path');
var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-bootstrap-datetimepicker',

  included: function(target) {
    this._super.included.apply(this, arguments);

    var app           = target.app || target;
    var bowerDir      = app.bowerDirectory;
    var options       = app.options['ember-bootstrap-datetimepicker'] || {};

    // Import css theme from bootstrap
    if (options.importBootstrapTheme) {
      app.import('vendor/bootstrap/css/bootstrap-theme.css');
    }

    // Import css and glyphicons from bootstrap
    if (options.importBootstrapCSS) {
      app.import('vendor/bootstrap/css/bootstrap.css');
      app.import('vendor/bootstrap/css/bootstrap.css.map', { destDir: 'assets' });

      // Import glyphicons
      app.import('vendor/bootstrap/fonts/glyphicons-halflings-regular.eot', { destDir: '/fonts' });
      app.import('vendor/bootstrap/fonts/glyphicons-halflings-regular.svg', { destDir: '/fonts' });
      app.import('vendor/bootstrap/fonts/glyphicons-halflings-regular.ttf', { destDir: '/fonts' });
      app.import('vendor/bootstrap/fonts/glyphicons-halflings-regular.woff', { destDir: '/fonts' });
      app.import('vendor/bootstrap/fonts/glyphicons-halflings-regular.woff2', { destDir: '/fonts'});
    }

    // Import css from bootstrap-datetimepicker
    app.import('vendor/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css');

    if(options.importFontAwesome) {
      app.import(bowerDir + '/font-awesome/css/font-awesome.min.css', { destDir: '/fonts'});
      app.import(bowerDir + '/font-awesome/fonts/fontawesome-webfont.woff', { destDir: '/fonts'});
      app.import(bowerDir + '/font-awesome/fonts/fontawesome-webfont.woff2', { destDir: '/fonts'});
      app.import(bowerDir + '/font-awesome/fonts/fontawesome-webfont.eot', { destDir: '/fonts'});
      app.import(bowerDir + '/font-awesome/fonts/fontawesome-webfont.svg', { destDir: '/fonts'});
      app.import(bowerDir + '/font-awesome/fonts/fontawesome-webfont.ttf', { destDir: '/fonts'});
    }

    // Import css from bootstrap
    if (options.importBootstrapJS) {
      app.import('vendor/bootstrap/js/bootstrap.js');
    }

    // Import js from bootstrap-datetimepicker
    app.import('vendor/eonasdan-bootstrap-datetimepicker/src/js/bootstrap-datetimepicker.js');
  },

  treeForVendor: function(vendorTree) {
    var trees = [];
    var datetimepickerPath = require.resolve('eonasdan-bootstrap-datetimepicker')
          .replace(path.join('src', 'js', 'bootstrap-datetimepicker.js'), '');

    if (vendorTree) {
      trees.push(vendorTree);
    }

    try {
      var bootstrapPath = require.resolve('bootstrap')
            .replace(path.join('js', 'npm.js'), '');
      trees.push(new Funnel(bootstrapPath, {
        destDir: 'bootstrap'
      }));
    } catch(err) {}

    trees.push(new Funnel(datetimepickerPath, {
      destDir: 'eonasdan-bootstrap-datetimepicker'
    }));

    return mergeTrees(trees);
  }
};
