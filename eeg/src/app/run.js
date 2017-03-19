module.exports = function($state) {
  //* Programatically go to results on the livedata page
  if(!location.hash) {
      $state.go('home.livedata.results');
  }
}
