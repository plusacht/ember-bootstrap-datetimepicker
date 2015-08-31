import Ember from "ember";
import hbs from 'htmlbars-inline-precompile';
import startApp from '../helpers/start-app';
import { test, moduleForComponent } from 'ember-qunit';

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
  //component = this.subject();
  this.render(
    Ember.Handlebars.compile(
      '{{bs-datetimepicker}}'
    )
  );

  andThen(function() {
    assert.equal($(".bootstrap-datetimepicker-widget").css("display"), undefined, "date picker is initially a hidden");
    click($(".input-group-addon"));
  });



  andThen(function() {
    assert.equal($(".bootstrap-datetimepicker-widget").css("display"), "block", "date picker is visible");
    click($(".input-group-addon"));
  });

  andThen(function() {
    assert.equal($(".bootstrap-datetimepicker-widget").css("display"), undefined, "date picker is hidden again");
  });
});

test("test yield", function(assert) {
  assert.expect(1);
  this.render(
    Ember.Handlebars.compile(
      '{{#bs-datetimepicker}}<label class="yieldholder">yield</label>{{input}}{{/bs-datetimepicker}}'
    )
  );

  // initial render
  //this.$();

  assert.equal($('label.yieldholder').text(), "yield");

});


test("test the useCurrent option", function(assert) {
  assert.expect(2);
  var date;
  this.on('handleDate', val => { assert.ok(val); });
  this.render(hbs`{{bs-datetimepicker useCurrent=true showClear=true updateDate='handleDate'}}`);

  andThen(function() {
    click($(".input-group-addon"));
  });

  andThen(function() {
    assert.notEqual(date, undefined);
  });

  andThen(function() {
    click($("a[data-action='clear']"));
  });

  andThen(function() {
    assert.equal(date, undefined);
  });
});

