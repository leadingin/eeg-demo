angular
  .module("eeg-app", [
    "ui.router",
    "ngAnimate",
    "ngLodash",
    "nvd3",
    "nvd3ChartDirectives"
  ])
  .config([
    "$stateProvider",
    require("./routes")
  ])
  .run([
    "$state",
    require("./run")
  ])

  // controllers
  .controller("HomeController", [
    "StateFactory",
    "SocketFactory",
    require("./controllers/home.controller")
  ])
  .controller("LivedataController", [
    "$state",
    "StateFactory",
    require("./controllers/livedata.controller")
  ])
  .controller("LivedataResultsController", [
    require("./controllers/livedata-results.controller")
  ])
  .controller("LivedataProcessController", [
    "StateFactory",
    require("./controllers/livedata-process.controller")
  ])
  .controller("HistoryController", [
    "$state",
    "StateFactory",
    require("./controllers/history.controller")
  ])

  // directives
  .directive("ngHeader", [
    require("./directives/header.directive")
  ])
  .directive("ngLineChart", [
    "StateFactory",
    "SocketFactory",
    "$http",
    require("./directives/line-chart.directive")
  ])
  .directive("ngScatterChart", [
    require("./directives/scatter-chart.directive")
  ])
  .directive("ngSidebar", [
    "$state",
    require("./directives/sidebar.directive")
  ])
  .directive("ngStemChart", [
    "SocketFactory",
    require("./directives/stem-chart.directive")
  ])
  .directive("ngTabBar", [
    require("./directives/tab-bar.directive")
  ])

  // factories
  .factory("ApiFactory", [
    require("./factories/api.factory")
  ])
  .factory("StateFactory", [
    "$rootScope",
    require("./factories/state.factory")
  ])
  .factory("SocketFactory", [
    "$rootScope",
    require("./factories/socket.factory")
  ])
