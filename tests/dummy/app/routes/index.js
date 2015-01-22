import Ember from 'ember';
import moment from 'moment';

export default Ember.Route.extend({

	model: function() {
		return Ember.Object.create({
			date1: moment(),
			date2: undefined,
			mindate: moment("2014-11-01"),
			maxdate: moment("2015-12-01"),
			disabled:true});
	},

  actions : {
    reset : function() {
      debugger;
       this.set('controller.model', Ember.Object.create({}));
   }
}
});
