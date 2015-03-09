import Ember from 'ember';
import moment from 'moment';
import FaIconsMixin from 'dummy/mixins/faicons';

export default Ember.Route.extend({

  model: function() {
    return Ember.Object.createWithMixins(FaIconsMixin,{
      date1: moment(),
      date2: undefined,
      mindate: moment("2014-11-01"),
      maxdate: moment("2015-12-01"),
      disabled:true
    });
  }
});
