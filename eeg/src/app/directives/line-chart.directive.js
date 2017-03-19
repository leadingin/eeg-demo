module.exports = function() {
  return {
    restrict: "E",
    replace: true,
    scope: {},
    template: require("../views/directives/line-chart.directive.html"),
    link: function(scope, el, attrs) {

    }
  }
}
