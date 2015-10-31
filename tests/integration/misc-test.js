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

test("test that non-computed properties are passed to the bootstrap-datetimepicker", function(assert) {
  assert.expect(1);

  this.set('localeName', 'en-IE');
  this.render(hbs`{{bs-datetimepicker locale=localeName}}`);

  assert.equal(this.$().length, 1);
});
