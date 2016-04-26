var angular = require('angular');
var navbar = require('./navbar');
var startup = require('./startup');
var auth = require('./auth');
var scores = require('./scores');
var help = require('./help');
var settings = require('./settings');
var user = require('./user');

module.exports = angular.module('chess', [
  require('angular-route'),
  require('angular-animate'),
  require('angular-ui-bootstrap'),
  navbar.name,
  startup.name,
  auth,
  user,
  scores.name,
  help.name,
  settings.name,
  require('./ping'),
  require('./playersRoom'),
  require('./board')
]).
config(RouteConfig);

RouteConfig.$inject = ['$routeProvider'];
function RouteConfig($routeProvider) {
  $routeProvider.otherwise({ redirectTo: '/' });
}
