module.exports = function() {
  return {
    restrict: "E",
    replace: true,
    scope: {},
    template: require("../views/directives/tab-bar.directive.html"),
    link: function(scope, el, attrs) {

    }
  }
}
