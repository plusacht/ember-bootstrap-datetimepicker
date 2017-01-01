module.exports = {
  normalizeEntityName: function() {},

  afterInstall: function() {
    return this.addAddonToProject('ember-cli-moment-shim', '~0.6.1').then(function() {
      return this.addPackageToProject('eonasdan-bootstrap-datetimepicker', '~4.17.42');
    }.bind(this));
  }
};
