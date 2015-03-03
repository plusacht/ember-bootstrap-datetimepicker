
import Ember from 'ember';

var computed = Ember.computed;
var datetimepickerDefaultConfig = Ember.$.fn.datetimepicker.defaults;
var isDatetimepickerConfigKeys = Ember.keys(datetimepickerDefaultConfig);


var bsDateTimePickerComponent = Ember.Component.extend({
  classNames: ["bs-datetimepicker-component"],
  textFieldClass: Ember.TextField,
  textFieldName: computed.alias("elementId"),
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

  placeholder: null,

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
