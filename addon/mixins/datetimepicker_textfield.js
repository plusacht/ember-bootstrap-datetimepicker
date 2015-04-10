import Ember from 'ember';

export default Ember.Mixin.create({

  /**
    Pick up exposed properties from parentView.textFieldOptions and bound them to this instance

  */
  _initDateTimePickerTextField: Ember.on('init',function() {
    var self = this;
    var options = this.get("parentView.textFieldOptions");
    this.set('classNames', this.get("parentView.textFieldClassNames"));
    if(!Ember.isEmpty(options)) {
      Ember.keys(options).forEach(function(key) {
        Ember.defineProperty(self, options[key], Ember.computed("parentView."+key, function(){
          return self.get("parentView."+key);
        }));
      });
    }
  })
});
