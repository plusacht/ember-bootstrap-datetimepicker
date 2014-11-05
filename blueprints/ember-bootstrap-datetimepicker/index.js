module.exports = {
  normalizeEntityName: function() {},

  afterInstall: function() {
    var that = this;

    return this.addBowerPackageToProject('eonasdan-bootstrap-datetimepicker').then(function() {
        return that.addBowerPackageToProject('moment');
    });
  }
};