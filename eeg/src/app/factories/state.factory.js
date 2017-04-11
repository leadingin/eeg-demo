module.exports = function($rootScope) {
  var state = {
    currentRoute: "",
    output: null
  }

  return {
    state: state,
    update: function(newState) {
      angular.forEach(newState, function(val, key) {
        if(key in state) {
          state[key] = newState[key];
        }
      })

      $rootScope.$broadcast("state:update", state);
    },
    onUpdate: function(cb) {
      $rootScope.$on("state:update", function(e, state) {
        cb(e, state);
      })
    }

  }
}
