# Ember-cli-bootstrap-datetimepicker #

[![Build Status](https://travis-ci.org/plus8/ember-cli-bootstrap-datetimepicker.svg)](https://travis-ci.org/plus8/ember-datepicker)


## Description ##
This component is an Ember CLI add-on and [ember-bootstrap](http://http://eonasdan.github.io/bootstrap-datetimepicker/ "Bootstrap datetimepicker")
to create an extensible ember component out of it. This is still a work in progress. Pull requests are welcome.

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
Check out the demo on [github pages](http://gevious.github.io/ember-datepicker/ "Bootstrap datetimepicker").
Alternatively you can clone this repo and run the app

```bash
sudo npm install -g ember-cli
git clone git@github.com:plus8/ember-cli-bootstrap-datetimepicker
cd ember-bootstrap-datetimepicker
npm install; bower install
ember server
```
* Visit your app at http://localhost:4200.

## General Options ##
All options supported offered by [ember-bootstrap](http://http://eonasdan.github.io/bootstrap-datetimepicker/ "Bootstrap datetimepicker") are supported

## Bound Options ##

### date ###
Type: `String` or `Date`

This variable will be changed when the user changes the date and on the other side it will update the datetime picker when "date" is updated

## Legal ##

[plus8](http://plus8.ch) gmbh &copy; 2014

[Licensed under the MIT license](http://www.opensource.org/licenses/mit-license.php)
