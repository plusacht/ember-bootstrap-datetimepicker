module.exports = {
  normalizeEntityName: function() {},

  afterInstall: function() {
    return this.addAddonToProject('ember-cli-moment-shim', '~0.6.1').then(function() {
      return this.addBowerPackageToProject('eonasdan-bootstrap-datetimepicker', '~4.14.30');
    }.bind(this));
  }
};
