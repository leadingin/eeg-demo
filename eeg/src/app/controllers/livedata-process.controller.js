module.exports = function(StateFactory) {
  var vm = this;
  vm.mood = 'neutral';

  StateFactory.onUpdate(function( e, state) {
    // console.log("State:", state);
    vm.mood = state.output;
  });
}
