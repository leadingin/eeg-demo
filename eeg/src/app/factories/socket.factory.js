module.exports = function($rootScope) {
    var socket = io.connect('http://localhost:5000/eeg');

    return {
        //* socket binding for io.on()
        on: function(eventName, cb) {
            socket.on(eventName, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    cb.apply(socket, args);
                });
            });
        },
        //* socket binding for io.emit()
        emit: function(eventName, data, cb) {
            socket.emit(eventName, data, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    if(cb) {
                        cb.apply(socket, args);
                    }
                });
            });
        }
    }
}
