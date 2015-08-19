import Ember from 'ember';
import DateTimePickerTextFieldMixin from 'ember-bootstrap-datetimepicker/mixins/datetimepicker_textfield';

var BsDatetimepickerInputComponent = Ember.TextField.extend(DateTimePickerTextFieldMixin);

export default BsDatetimepickerInputComponent;
