import Ember from "ember";
import hbs from 'htmlbars-inline-precompile';
import startApp from '../helpers/start-app';
import { test, moduleForComponent } from 'ember-qunit';
import moment from 'moment';

var App, component;

moduleForComponent('bs-datetimepicker', 'ember-bootstrap-datetimepicker integration', {
  integration: true,
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
    // clear up component (this should be done by ember-qunit soon!)
    if (component) {
      Ember.run(component, 'destroy');
      component = null;
    }
  }
});

test("it shows the picker on input focus, then hides it after click outside", function(assert) {
  assert.expect(3);
  this.render(
    Ember.Handlebars.compile(
      '{{bs-datetimepicker}}'
    )
  );

  andThen(() => {
    assert.equal($(".bootstrap-datetimepicker-widget").css("display"), undefined, "date picker is initially a hidden");
    click($(".input-group-addon"));
  });



  andThen(() => {
    assert.equal($(".bootstrap-datetimepicker-widget").css("display"), "block", "date picker is visible");
    click($(".input-group-addon"));
  });

  andThen(() => {
    assert.equal($(".bootstrap-datetimepicker-widget").css("display"), undefined, "date picker is hidden again");
  });
});



test("test yield", function(assert) {
  assert.expect(1);
  this.render(hbs`{{#bs-datetimepicker}}<label class="yieldholder">yield</label>{{input}}{{/bs-datetimepicker}}`);

  assert.equal($('label.yieldholder').text(), 'yield');
});

test("test the useCurrent option default value is true", function(assert) {
  assert.expect(1);

  this.on('handleDate', val => {
    assert.ok(val);
  });


  this.render(hbs`{{bs-datetimepicker updateDate='handleDate'}}`);
  click($(".input-group-addon"));
});

test("test the useCurrent option set to false", function(assert) {
  assert.expect(0);

  this.on('handleDate', val => {
    assert.ok(val);
  });


  this.render(hbs`{{bs-datetimepicker useCurrent=false updateDate='handleDate'}}`);
  click($(".input-group-addon"));

});

test("test the useCurrent option set to true with initial value", function(assert) {
  assert.expect(0);

  this.on('handleDate', val => {
    assert.ok(val);
  });

  this.set('date', moment('2015-11-01 09:30:00'));
  this.render(hbs`{{bs-datetimepicker date=date updateDate='handleDate'}}`);
  click($(".input-group-addon"));

});

test("test the useCurrent option set to true with initial date not rounded to the minute", function(assert) {
  assert.expect(1);

  this.on('handleDate', val => {
    assert.ok(val);
  });

  this.set('date', moment('2015-11-01 09:30:01'));
  this.render(hbs`{{bs-datetimepicker date=date updateDate='handleDate'}}`);
  click($(".input-group-addon"));

});

test("test the forceDateOutput option", function(assert) {
  assert.expect(1);

  this.on('handleDate', val => {
    assert.ok(val instanceof Date);
  });

  this.set('date', moment('2015-11-01 09:30:01'));
  this.render(hbs`{{bs-datetimepicker forceDateOutput=true updateDate='handleDate'}}`);
  click($(".input-group-addon"));

});

test("test the showClear option", function(assert) {
  assert.expect(1);
  var date = false;
  this.on('handleDate', val => {
    date = val;
  });
  this.render(hbs`{{bs-datetimepicker showClear=true updateDate='handleDate'}}`);

  andThen(() => {
    click($(".input-group-addon"));
  });

  andThen(() => {
    click($("a[data-action='clear']"));
  });

  andThen(() =>  {
    assert.equal(date, undefined, 'should be undefined after clear the date');
  });
});

test("test 'maxDate' bound property", function(assert) {
  assert.expect(3);
  let maxDate = moment().date(15);
  this.set('maxDate', maxDate);
  this.render(hbs`{{bs-datetimepicker maxDate=maxDate}}`);

  andThen(() => {
    click($(".input-group-addon"));
  });

  andThen(() => {
    assert.ok(!$('*[data-day="'+maxDate.format('MM/DD/YYYY')+'"]').hasClass('disabled'), '15th of the month should be enabled');
    assert.ok($('*[data-day="'+moment(maxDate).date(16).format('MM/DD/YYYY')+'"]').hasClass('disabled'), '16th of the month should be disabled');
    click($(".input-group-addon"));
  });

  andThen(()=> {
    this.set('maxDate', maxDate.date(16));
  });

  andThen(() => {
    assert.ok(!$('*[data-day="'+moment(maxDate).date(16).format('MM/DD/YYYY')+'"]').hasClass('disabled'), '16th of the month should be enabled');
  });
});

test("test 'minDate' bound property", function(assert) {
  assert.expect(3);
  let minDate = moment().date(15);
  this.set('minDate', minDate);
  this.render(hbs`{{bs-datetimepicker minDate=minDate}}`);

  andThen(() => {
    click($(".input-group-addon"));
  });

  andThen(() => {
    assert.ok(!$('*[data-day="'+minDate.format('MM/DD/YYYY')+'"]').hasClass('disabled'), 'minDate should be enabled');
    assert.ok($('*[data-day="'+moment(minDate).date(14).format('MM/DD/YYYY')+'"]').hasClass('disabled'), 'minDate - 1 day should be disabled');
    click($(".input-group-addon"));
  });

  andThen(()=> {
    this.set('minDate', minDate.date(14));
  });

  andThen(() => {
    assert.ok(!$('*[data-day="'+moment(minDate).date(14).format('MM/DD/YYYY')+'"]').hasClass('disabled'), '14th of the month should be enabled');
  });

});

// test("test 'disabledDates' bound property", function(assert) {
//   assert.expect(6);
//   let date1 = moment().date(15).startOf('day');
//   let date2 = moment().date(16).startOf('day');
//   let date3 = moment().date(17).startOf('day');
//
//   this.set('disabledDates', [date1, date3]);
//   this.render(hbs`{{bs-datetimepicker disabledDates=disabledDates}}`);
//
//   andThen(() => {
//     click($(".input-group-addon"));
//   });
//
//   andThen(() => {
//     assert.ok($('*[data-day="'+date1.format('MM/DD/YYYY')+'"]').hasClass('disabled'), 'date1 should be disabled');
//     assert.ok(!$('*[data-day="'+date2.format('MM/DD/YYYY')+'"]').hasClass('disabled'), 'date2 should be enabled');
//     assert.ok($('*[data-day="'+date3.format('MM/DD/YYYY')+'"]').hasClass('disabled'), 'date3 should be disabled');
//     click($(".input-group-addon"));
//   });
//
//   andThen(()=> {
//     this.set('disabledDates', [date2]);
//   });
//
//   andThen(() => {
//     assert.ok(!$('*[data-day="'+date1.format('MM/DD/YYYY')+'"]').hasClass('disabled'), 'date1 should be enabled');
//     assert.ok($('*[data-day="'+date2.format('MM/DD/YYYY')+'"]').hasClass('disabled'), 'date2 should be disabled');
//     assert.ok(!$('*[data-day="'+date3.format('MM/DD/YYYY')+'"]').hasClass('disabled'), 'date3 should be enabled');
//   });
//
// });

test("test 'disabled' bound property", function(assert) {
  assert.expect(2);

  this.set('disabled', true);
  this.render(hbs`{{bs-datetimepicker disabled=disabled}}`);

  assert.ok(this.$('input').attr('disabled'), 'should be disabled');

  Ember.run(()=> {
    this.set('disabled', false);
  });

  assert.equal(this.$('input').attr('disabled'), undefined, 'no attribute disabled should be shown');
});

test("test 'noIcon' property", function(assert) {
  assert.expect(1);

  this.render(hbs`{{bs-datetimepicker noIcon=true}}`);

  assert.equal($(".input-group-addon").length, 0, 'no input-group-addon in html');

});
