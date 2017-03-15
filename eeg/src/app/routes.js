module.exports = function($stateProvider) {
  $stateProvider
    .state("home", {
      abstract: true,
      url: "/",
      template: require("./views/pages/home.page.html"),
      controller: "HomeController as ctrl_home",
    })
    .state("home.livedata", {
      abstract: true,
      url: "livedata/",
      template: require("./views/pages/livedata.page.html"),
      controller: "LivedataController as ctrl_livedata",
    })
    .state("home.livedata.results", {
      url: "results/",
      template: require("./views/pages/livedata-results.page.html"),
      controller: "LivedataResultsController as ctrl_results",
    })
    .state("home.livedata.process", {
      url: "process/",
      template: require("./views/pages/livedata-process.page.html"),
      controller: "LivedataProcessController as ctrl_process",
    })
    .state("home.history", {
      url: "history/",
      template: require("./views/pages/history.page.html"),
      controller: "HistoryController as ctrl_history",
    })
}
