/* jshint node: true */
'use strict';

var path = require('path');

module.exports = {
  name: 'ember-bootstrap-datetimepicker',

  included: function(app) {
    this._super.included(app);

    var bowerDir      = app.bowerDirectory;
    var bootstrapPath = path.join(bowerDir,'/bootstrap/dist/');
    var options       = app.options['ember-bootstrap-datetimepicker'] || {};

    // Import css theme from bootstrap
    if (options.importBootstrapTheme) {
      app.import(path.join(bootstrapPath, 'css/bootstrap-theme.css'));
    }

    // Import css and glyphicons from bootstrap
    if (options.importBootstrapCSS) {
      app.import(path.join(bootstrapPath, 'css/bootstrap.css'));
      app.import(path.join(bootstrapPath, 'css/bootstrap.css.map'), { destDir: 'assets' });

      // Import glyphicons
      app.import(path.join(bootstrapPath, 'fonts/glyphicons-halflings-regular.eot'), { destDir: '/fonts' });
      app.import(path.join(bootstrapPath, 'fonts/glyphicons-halflings-regular.svg'), { destDir: '/fonts' });
      app.import(path.join(bootstrapPath, 'fonts/glyphicons-halflings-regular.ttf'), { destDir: '/fonts' });
      app.import(path.join(bootstrapPath, 'fonts/glyphicons-halflings-regular.woff'), { destDir: '/fonts' });
      app.import(path.join(bootstrapPath, 'fonts/glyphicons-halflings-regular.woff2'), { destDir: '/fonts'});
    }

    // Import css from bootstrap-datetimepicker
    app.import(path.join(bowerDir, '/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css'));

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
      app.import(path.join(bootstrapPath, 'js/bootstrap.js'));
    }

    // Import js from bootstrap-datetimepicker
    app.import(path.join(bowerDir, '/eonasdan-bootstrap-datetimepicker/src/js/bootstrap-datetimepicker.js'));
  }
};
