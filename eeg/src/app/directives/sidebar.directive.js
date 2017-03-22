module.exports = function($state) {
  return {
    restrict: "E",
    replace: true,
    scope: {
      route: "="
    },
    template: require("../views/directives/sidebar.directive.html"),
    link: function(scope, el, attrs) {
      scope.includes = $state.includes;
      // scope.$watch("route", function(newValue, oldValue) {
      //   console.log("route: ", newValue);
      //   console.log(scope.includes(newValue));
      // })
    }
  }
}
