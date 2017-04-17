module.exports = function(StateFactory, SocketFactory) {
  var vm = this;

  StateFactory.onUpdate(function(e, state) {
    // console.log(state);
    vm.route = state.currentRoute;
  });

  SocketFactory.on('connect', function() {
    console.log('connected!\nInitializing Variables...');
    // SocketFactory.emit('script:run'); // Start Script
    SocketFactory.emit('script:init'); // Start Script
  });


}
