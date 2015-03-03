import Ember from 'ember';

export default Ember.Mixin.create({
  _initDateTimePickerTextField: function() {
    var self = this;
    var options = this.get("parentView.textFieldOptions");
    this.set('classNames', this.get("parentView.textFieldClassNames"));
    if(!Ember.isEmpty(options)) {
      Ember.keys(options).forEach(function(key) {
        self.set(key, options[key]);
      });
    }
  }.on("init")
});
