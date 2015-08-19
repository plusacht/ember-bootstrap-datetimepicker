import Ember from "ember";
import startApp from '../helpers/start-app';
import { test, moduleForComponent } from 'ember-qunit';

var App, component;

moduleForComponent('bs-datetimepicker', 'ember-bootstrap-datetimepicker unit', {
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
  },
  needs: ['component:bs-datetimepicker-input']
});



test("test the useCurrent option", function(assert) {
  assert.expect(2);
  component = this.subject({
    useCurrent:true,
    showClear:true
  });

  this.$();

  andThen(function() {
    click($(".input-group-addon"));
  });

  andThen(function() {
    assert.notEqual(component.get('date'), undefined);
  });

  andThen(function() {
    click($("a[data-action='clear']"));
  });

  andThen(function() {
    assert.equal(component.get('date'), undefined);
  });
});

