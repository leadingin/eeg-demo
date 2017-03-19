module.exports = function() {
  return {
    restrict: "E",
    replace: true,
    scope: {},
    template: require("../views/directives/sidebar.directive.html"),
    link: function(scope, el, attrs) {

    }
  }
}
