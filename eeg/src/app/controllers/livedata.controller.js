module.exports = function($state, StateFactory) {
  var vm = this;

  StateFactory.update({
    currentRoute: $state.current.name
  })
}
