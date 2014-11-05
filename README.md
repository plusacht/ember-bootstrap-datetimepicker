# Ember-cli-bootstrap-datetimepicker [![Build Status](https://travis-ci.org/plusacht/ember-cli-bootstrap-datetimepicker.svg)](https://travis-ci.org/plusacht/ember-cli-bootstrap-datetimepicker)

Datetimepicker ad-don for ember-cli



## Installation ##

```bash
npm install ember-cli-bootstrap-datetimepicker --save-dev
ember g ember-cli-bootstrap-datetimepicker
```

## Basic Usage

### Template
```handlebars
{{bs-datetimepicker date=mydate format='YYYY-MM-DD'}}
```

### Brocfile.js ###
The twitter bootstrap resources will not be imported to your resources by default. If you want the addon to add it you have to specify it in the `Brocfile.js`

```javascript
var app = new EmberAddon({
  'ember-bootstrap-datetimepicker': {
    "importBootstrapCSS": true,
    "importBootstrapJS": true,
    "importBootstrapTheme": true
  }
});
```

## Building yourself ##
                                     
Check out the demo on [github pages](http://plusacht.github.io/ember-cli-bootstrap-datetimepicker "Bootstrap datetimepicker").
Alternatively you can clone this repo and run the app

```bash
sudo npm install -g ember-cli
git clone https://github.com/plusacht/ember-bootstrap-datetimepicker.git
cd ember-bootstrap-datetimepicker
npm install; bower install
ember serve
```
* Visit your app at http://localhost:4200.

## General Options ##
All options supported offered by [ember-bootstrap](http://eonasdan.github.io/bootstrap-datetimepicker/ "Bootstrap datetimepicker") are supported

## Bound Options ##

### date ###
Type: `String` or `Date`

This variable will be changed when the user changes the date and on the other side it will update the datetime picker when "date" is updated

## Credits ##

This add-on is based on [bootstrap-datetimepicker](http://eonasdan.github.io/bootstrap-datetimepicker/ "Bootstrap datetimepicker")

## Legal ##

[plus8](http://plus8.ch) gmbh &copy; 2014

[Licensed under the MIT license](http://www.opensource.org/licenses/mit-license.php)
