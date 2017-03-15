module.exports = function() {
  return {
    restrict: "E",
    replace: true,
    scope: {},
    template: require("../views/directives/header.directive.html"),
    link: function(scope, el, attrs) {

    }
  }
}
