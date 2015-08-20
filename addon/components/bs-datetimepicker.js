import Ember from 'ember';

const {on,computed} = Ember;

const computedProps = Ember.A(['minDate', 'maxDate', 'disabledDates', 'enabledDates', 'dateIcon']);

var bsDateTimePickerComponent = Ember.Component.extend({
  concatenatedProperties: ['textFieldClassNames'],
  classNames: ['date'],
  classNameBindings: ['inputGroupClass'],
  textFieldClassNames: ['form-control'],
  bsDateTimePicker: null,
  dateIcon: 'glyphicon glyphicon-calendar',

  inputGroupClass: computed('attrs.noIcon', function() {
    if (!this.getAttr('noIcon')) {
       return 'input-group';
     }
  }),

  _initDatepicker: on('didInsertElement', function() {
    var target;
    if (this.getAttr('noIcon')) {
      target = this.$('.' + this.get('textFieldClassNames').join('.'));
    } else {
      target = this.$();
    }
    var bsDateTimePicker = target.datetimepicker(this._buildConfig());
    var bsDateTimePickerFn = bsDateTimePicker.data('DateTimePicker');

    this.set('bsDateTimePicker', bsDateTimePickerFn);

    bsDateTimePicker.on('dp.change', function(ev) {
      if(this.get('updateDate')) {
        if (Ember.isNone(ev.date) || ev.date === false) {
          this.getAttr('updateDate')(undefined);
        } else if (!ev.date.isSame(this.getAttr('date'))) {
          if (this.getAttr('forceDateOutput')) {
            this.getAttr('updateDate')(ev.date.toDate());
          } else {
            this.getAttr('updateDate')(ev.date);
          }
        }
      }
      else {
        //warn
      }
    }.bind(this));

    this._updateDateTimePicker();

    if (this.getAttr('open')) {
      this.get('bsDateTimePicker').show();
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
  },

  _destroyDatepicker: on('willDestroyElement', function() {
    this.get('bsDateTimePicker').destroy();
  }),


  _buildConfig() {
    var datetimepickerDefaultConfig = Ember.$.fn.datetimepicker.defaults;
    var isDatetimepickerConfigKeys = Object.keys(datetimepickerDefaultConfig);
    var config = {};
    for (var i = 0; i < isDatetimepickerConfigKeys.length; i++) {
      if (!computedProps.contains(isDatetimepickerConfigKeys[i])) {
        config[isDatetimepickerConfigKeys[i]] = this.getWithDefault(
          'attrs.'+isDatetimepickerConfigKeys[i],
          datetimepickerDefaultConfig[isDatetimepickerConfigKeys[i]]);
      }
    }

    return config;
  }
});

export default bsDateTimePickerComponent;
