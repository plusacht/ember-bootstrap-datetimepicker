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
  date: null,
  bsDateTimePicker: null,

  // Computed options
  minDate: datetimepickerDefaultConfig['minDate'],
  maxDate: datetimepickerDefaultConfig['maxDate'],
  disabledDates: [],
  enabledDates: [],
  dateIcon: 'glyphicon glyphicon-calendar',

  disabled: false,
  open: false,
  forceDateOutput: false,

  inputGroupClass: Ember.computed(function() {
    if (!this.get('noIcon')) {
      return 'input-group';
    }
  }),

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
    if (self.get('date') === undefined) {
      bsDateTimePickerFn.date(null);
    } else {
      bsDateTimePickerFn.date(self.get('date'));
    }

    bsDateTimePicker.on('dp.change', function(ev) {
      if (Ember.isNone(ev.date) || ev.date === false) {
        self.set('date', undefined);
      } else if (!ev.date.isSame(self.get('date'))) {
        if (self.forceDateOutput) {
          self.set('date', ev.date.toDate());
        } else {
          self.set('date', ev.date);
        }
      }
    });

    this._disabledObserver();

    this.addObserver('disabled', function() {
      if (this.get('disabled')) {
        this.get('bsDateTimePicker').disable();
      } else {
        this.get('bsDateTimePicker').enable();
      }
    });

    this.addObserver('open', function() {
      if (this.get('open')) {
        this.get('bsDateTimePicker').show();
      } else {
        this.get('bsDateTimePicker').hide();
      }
    });

    this.addObserver('minDate', function() {
      if (Ember.isNone(this.get('minDate'))) {
        this.get('bsDateTimePicker').minDate(false);
      } else {
        this.get('bsDateTimePicker').minDate(this.get('minDate'));
      }
    });

    this.addObserver('maxDate', function() {
      if (Ember.isNone(this.get('maxDate'))) {
        this.get('bsDateTimePicker').maxDate(false);
      } else {
        this.get('bsDateTimePicker').maxDate(this.get('maxDate'));
      }
    });

    this.addObserver('disabledDates', function() {
      this.get('bsDateTimePicker').disabledDates(this.get('disabledDates'));
    });

    this.addObserver('enabledDates', function() {
      this.get('bsDateTimePicker').enabledDates(this.get('enabledDates'));
    });

    this.addObserver('date', function() {
      var bsDateTimePickerFn = this.get('bsDateTimePicker');

      if (this.get('date') === undefined) {
        bsDateTimePickerFn.date(null);
      } else {
        bsDateTimePickerFn.date(this.get('date'));
      }

    });


    if (self.get('open')) {
      self.get('bsDateTimePicker').show();
    }
  }),


  _disabledObserver: Ember.observer('disabled', function() {
    if (this.get('disabled')) {
      this.get('bsDateTimePicker').disable();
    } else {
      this.get('bsDateTimePicker').enable();
    }
  }),


  _destroyDatepicker: on('willDestroyElement', function() {
    this.removeObserver('disabled');
    this.removeObserver('open');
    this.removeObserver('minDate');
    this.removeObserver('maxDate');
    this.removeObserver('disabledDates');
    this.removeObserver('enabledDates');
    this.removeObserver('date');

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
