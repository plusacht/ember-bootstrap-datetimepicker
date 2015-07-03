/* global moment */
import Ember from "ember";
import startApp from '../helpers/start-app';
import { test, moduleForComponent } from 'ember-qunit';

var App, component;

moduleForComponent('bs-datetimepicker', 'ember-bootstrap-datetimepicker integration', {
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
  component = this.subject();

  // initial render
  this.$();

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


test("test the 'showClear' option", function(assert) {
  assert.expect(2);
  component = this.subject({
    useCurrent: true,
    showClear: true
  });

  // initial render
  this.$();

  andThen(function() {
    click($(".input-group-addon"));
  });

  andThen(function() {
    assert.notEqual(component.get('date'), null);
  });

  andThen(function() {
    click($("a[data-action='clear']"));
  });

  andThen(function() {
    assert.equal(component.get('date'), null);
  });
});
