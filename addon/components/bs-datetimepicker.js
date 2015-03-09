
import Ember from 'ember';
import DateTimePickerTextFieldMixin from 'ember-bootstrap-datetimepicker/mixins/datetimepicker_textfield';

var computed = Ember.computed;
var datetimepickerDefaultConfig = Ember.$.fn.datetimepicker.defaults;
var isDatetimepickerConfigKeys = Ember.keys(datetimepickerDefaultConfig);

var bsDateTimePickerComponent = Ember.Component.extend({
  concatenatedProperties: ["textFieldClassNames"],
  classNames: ["bs-datetimepicker-component"],
  textFieldClass: Ember.TextField.extend(DateTimePickerTextFieldMixin),
  textFieldClassNames: ["form-control"],
  textFieldName: computed.alias("elementId"),
  textFieldOptions:null,
  date: null,
  bsDateTimePicker: null,

  //computed options
  minDate: datetimepickerDefaultConfig["minDate"],
  maxDate: datetimepickerDefaultConfig["maxDate"],
  disabledDates:[],
  enabledDates:[],
  dateIcon: "glyphicon glyphicon-calendar",

  disabled:false,
  open: false,
  forceDateOutput: false,


  _initDatepicker: function() {
    var self = this;
    var bsDateTimePicker = this.$(".datetimepicker").datetimepicker(this._buildConfig());
    var bsDateTimePickerFn = bsDateTimePicker.data("DateTimePicker");

    this.set('bsDateTimePicker', bsDateTimePickerFn);
    if(self.get("date") === undefined) {
      bsDateTimePickerFn.date(null);
    } else {
      bsDateTimePickerFn.date(self.get("date"));
    }


    bsDateTimePicker.on("dp.change", function(ev) {
      if(Ember.isNone(ev.date)) {
        self.set("date", undefined);
      } else if (!ev.date.isSame(self.get('date'))) {
        if(self.forceDateOutput) {
          self.set("date", ev.date.toDate());
        } else {
          self.set("date", ev.date);
        }
      }
    });

    this._disabledObserver();

    if(self.get("open")) {
      self.get("bsDateTimePicker").show();
    }
  }.on("didInsertElement"),



  _disabledObserver: function() {
    if(this.get("disabled")) {
      this.get("bsDateTimePicker").disable();
    } else {
      this.get("bsDateTimePicker").enable();
    }
  }.observes("disabled"),

  _openObserver: function() {
    if(this.get("open")) {
      this.get("bsDateTimePicker").show();
    } else {
      this.get("bsDateTimePicker").hide();
    }
  }.observes("open"),

  _minDateObserver: function() {
    if(Ember.isNone(this.get('minDate'))) {
      this.get("bsDateTimePicker").minDate(false);
    } else {
      this.get("bsDateTimePicker").minDate(this.get('minDate'));
    }
  }.observes("minDate"),

  _maxDateObserver: function() {
    if(Ember.isNone(this.get('maxDate'))) {
      this.get("bsDateTimePicker").maxDate(false);
    } else {
      this.get("bsDateTimePicker").maxDate(this.get('maxDate'));
    }
  }.observes("maxDate"),

  _disabledDatesObserver: function() {
    this.get("bsDateTimePicker").disabledDates(this.get('disabledDates'));
  }.observes("disabledDates"),

  _enabledDatesObserver: function() {
    this.get("bsDateTimePicker").enabledDates(this.get('enabledDates'));
  }.observes("enabledDates"),

  _dateObserver: function() {
    var bsDateTimePickerFn = this.get("bsDateTimePicker");

    if(this.get("date") === undefined) {
      bsDateTimePickerFn.date(null);
    } else {
      bsDateTimePickerFn.date(this.get("date"));
    }

  }.observes("date"),

  _destroyDatepicker: function() {
    this.get("bsDateTimePicker").destroy();
  }.on("willDestroyElement"),

  _buildConfig: function() {
    var config = {};
    for(var i=0; i< isDatetimepickerConfigKeys.length; i++) {
      config[isDatetimepickerConfigKeys[i]] = this.get(isDatetimepickerConfigKeys[i]);
    }
    return config;
  },

  /**

    Exposing the textField properties.
    Every property beginning with "textField" will be exposed to the TextField view.

    ```handlebars
    {{bs-datetimepicker textFieldPlaceholder="Date"}}
    ```
    "textFieldPlaceholder" will be exposed to the TextField as "placeholder" property.

  */
  setUnknownProperty: function(key, value){
    var prop;
    var ckey;
    if(key.indexOf("textField") === 0) {

      if(Ember.isNone(this.get('textFieldOptions'))) {
        this.set('textFieldOptions',{});
      }

      if(Ember.IS_BINDING.test(key)) {
        prop = key.substring(0,key.length-7);
      }
      else {
       prop = key.substring(0,key.length);
      }

      ckey = prop.substring(9);
      ckey = ckey.charAt(0).toLowerCase() + ckey.substr(1);

      if(Ember.isNone(this.get('textFieldOptions.'+prop))) {

        this.set('textFieldOptions.'+prop,ckey);

        Ember.defineProperty(this, prop, null, value);
      }
    }
    else {
      if(Ember.platform.hasPropertyAccessors) {
        Ember.defineProperty(this, key, null, value);
      }
      else {
        this[key] = value;
      }
    }
  }
});


var computedProps = ["minDate","maxDate","disabledDates","enabledDates","dateIcon"];
var newClassConfig = {};
for(var i=0; i<isDatetimepickerConfigKeys.length; i++) {
  if(!computedProps.contains(isDatetimepickerConfigKeys[i])) {
    newClassConfig[isDatetimepickerConfigKeys[i]] = datetimepickerDefaultConfig[isDatetimepickerConfigKeys[i]];
  }
}

bsDateTimePickerComponent.reopen(newClassConfig);


export default bsDateTimePickerComponent;
