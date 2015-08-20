import Ember from 'ember';

const {on} = Ember;

const datetimepickerDefaultConfig = Ember.$.fn.datetimepicker.defaults;
const isDatetimepickerConfigKeys = Object.keys(datetimepickerDefaultConfig);
const computedProps = Ember.A(['minDate', 'maxDate', 'disabledDates', 'enabledDates', 'dateIcon']);
const newClassConfig = {};

var bsDateTimePickerComponent = Ember.Component.extend({
  concatenatedProperties: ['textFieldClassNames'],
  classNames: ['date'],
  classNameBindings: ['inputGroupClass'],
  textFieldClassNames: ['form-control'],
  bsDateTimePicker: null,
  noIcon: false,
  dateIcon: 'glyphicon glyphicon-calendar',

  inputGroupClass: undefined,

  _initDatepicker: on('didInsertElement', function() {
    var target;
    var self = this;
    if (this.get('noIcon')) {
      var targetClassNames = '.' + this.get('textFieldClassNames').join('.');
      target = this.$(targetClassNames);
    } else {
      target = this.$();
    }
    var bsDateTimePicker = target.datetimepicker(this._buildConfig());
    var bsDateTimePickerFn = bsDateTimePicker.data('DateTimePicker');

    this.set('bsDateTimePicker', bsDateTimePickerFn);

    bsDateTimePicker.on('dp.change', function(ev) {
      if(self.get('updateDate')) {
        if (Ember.isNone(ev.date) || ev.date === false) {
          self.getAttr('updateDate')(undefined);
        } else if (!ev.date.isSame(self.getAttr('date'))) {
          if (self.getAttr('forceDateOutput')) {
            self.getAttr('updateDate')(ev.date.toDate());
          } else {
            self.getAttr('updateDate')(ev.date);
          }
        }
      }
      else {
        //warn
      }
    });

    self._updateDateTimePicker();

    if (self.getAttr('open')) {
      self.get('bsDateTimePicker').show();
    }
  }),

  didReceiveAttrs() {
    this._updateDateTimePicker();
  },

  _updateDateTimePicker() {

    var dateTimePicker = this.get('bsDateTimePicker');
    if(dateTimePicker) {
      if (this.getAttr('disabled')) {
        dateTimePicker.disable();
      } else {
        dateTimePicker.enable();
      }

      if (this.getAttr('date') === undefined) {
        dateTimePicker.date(null);
      } else {
        dateTimePicker.date(this.getAttr('date'));
      }

      if (!this.getAttr('minDate')) {
        dateTimePicker.minDate(false);
      } else {
        dateTimePicker.minDate(this.getAttr('minDate'));
      }

      if (!this.getAttr('maxDate')) {
        dateTimePicker.maxDate(false);
      } else {
        dateTimePicker.maxDate(this.getAttr('maxDate'));
      }

      if (!this.getAttr('disabledDates')) {
        dateTimePicker.disabledDates([]);
      } else {
        dateTimePicker.disabledDates(this.getAttr('disabledDates'));
      }

      if (!this.getAttr('enabledDates')) {
        dateTimePicker.enabledDates([]);
      } else {
        dateTimePicker.enabledDates(this.getAttr('enabledDates'));
      }
    }

    if (!this.getAttr('noIcon')) {
       this.set('inputGroupClass', 'input-group');
     } else {
       this.set('inputGroupClass', undefined);
    }
  },

  _destroyDatepicker: on('willDestroyElement', function() {

    this.get('bsDateTimePicker').destroy();
  }),


  _buildConfig() {
    var config = {};
    for (var i = 0; i < isDatetimepickerConfigKeys.length; i++) {
      config[isDatetimepickerConfigKeys[i]] = this.get(isDatetimepickerConfigKeys[i]);
    }

    return config;
  }
});

for (var i = 0; i < isDatetimepickerConfigKeys.length; i++) {
  if (!computedProps.contains(isDatetimepickerConfigKeys[i])) {
    newClassConfig[isDatetimepickerConfigKeys[i]] = datetimepickerDefaultConfig[isDatetimepickerConfigKeys[i]];
  }
}

bsDateTimePickerComponent.reopen(newClassConfig);

export default bsDateTimePickerComponent;
