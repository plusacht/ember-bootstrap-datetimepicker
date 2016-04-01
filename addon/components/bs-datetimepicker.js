import Ember from 'ember';

const { computed, run } = Ember;
const computedProps = Ember.A(['minDate', 'maxDate', 'disabledDates', 'enabledDates', 'dateIcon', 'placeholder']);

var bsDateTimePickerComponent = Ember.Component.extend({
  concatenatedProperties: ['textFieldClassNames'],
  classNames: ['date'],
  classNameBindings: ['inputGroupClass'],
  textFieldClassNames: ['form-control'],
  bsDateTimePicker: null,
  dateIcon: 'glyphicon glyphicon-calendar',
  placeholder: '',

  inputGroupClass: computed('attrs.noIcon', function() {
    if (!this.getAttr('noIcon')) {
       return 'input-group';
     }
  }),

  didInsertElement() {
    this._super(...arguments);

    var target;
    if (this.getAttr('noIcon')) {
      target = this.$('.' + this.get('textFieldClassNames').join('.'));
    } else {
      target = this.$();
    }

    var bsDateTimePicker = target.datetimepicker(this._buildConfig());
    this.bsDateTimePicker = bsDateTimePicker.data('DateTimePicker');
    this.scheduledUpdate = run.scheduleOnce('afterRender', this, this._setupChangeEvent, bsDateTimePicker);

    this._updateDateTimePicker();

    if (this.attrs.open) {
      this.bsDateTimePicker.show();
    }
  },

  willDestroyElement() {
    this._super(...arguments);

    run.cancel(this.scheduledUpdate);
    this.bsDateTimePicker.destroy();
  },

  didReceiveAttrs() {
    this._super(...arguments);
    this._updateDateTimePicker();
  },

  _setupChangeEvent(bsDateTimePicker) {
    bsDateTimePicker.on('dp.change', ev => {
      run.schedule('actions', () => {
        if(this.attrs.updateDate) {
          if (Ember.isNone(ev.date) || ev.date === false) {
            this.sendAction('updateDate', undefined);
          } else if (!ev.date.isSame(this.getAttr('date'))) {
            if (this.attrs.forceDateOutput) {
              this.sendAction('updateDate', ev.date.toDate());
            } else {
              this.sendAction('updateDate', ev.date);
            }
          }
        }
      });
    });
  },

  _updateDateTimePicker() {
    var dateTimePicker = this.bsDateTimePicker;
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

  _buildConfig() {
    var datetimepickerDefaultConfig = Ember.$.fn.datetimepicker.defaults;
    var isDatetimepickerConfigKeys = Object.keys(datetimepickerDefaultConfig);
    var config = {};
    var configKey;
    for (var i = 0; i < isDatetimepickerConfigKeys.length; i++) {
      configKey = isDatetimepickerConfigKeys[i];
      if (!computedProps.contains(configKey)) {
        config[configKey] = this.getWithDefault(configKey, datetimepickerDefaultConfig[configKey]);
      }
    }

    return config;
  }
});

export default bsDateTimePickerComponent;
