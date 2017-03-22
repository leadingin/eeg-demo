module.exports = function(StateFactory) {
  var vm = this;

  StateFactory.onUpdate(function(e, state) {
    // console.log(state);
    vm.route = state.currentRoute;
  })
}
