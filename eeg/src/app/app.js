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
    require("./controllers/home.controller")
  ])
  .controller("LivedataController", [
    require("./controllers/livedata.controller")
  ])
  .controller("LivedataResultsController", [
    require("./controllers/livedata-results.controller")
  ])
  .controller("LivedataProcessController", [
    require("./controllers/livedata-process.controller")
  ])
  .controller("HistoryController", [
    require("./controllers/history.controller")
  ])

  // directives
  .directive("ngHeader", [
    require("./directives/header.directive")
  ])
  .directive("ngLineChart", [
    require("./directives/line-chart.directive")
  ])
  .directive("ngScatterChart", [
    require("./directives/scatter-chart.directive")
  ])
  .directive("ngSidebar", [
    require("./directives/sidebar.directive")
  ])
  .directive("ngStemChart", [
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
    require("./factories/state.factory")
  ])
  .factory("SocketFactory", [
    require("./factories/socket.factory")
  ])
