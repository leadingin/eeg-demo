module.exports = function(SocketFactory, $http) {
  return {
    restrict: "E",
    replace: true,
    scope: {
      filename: "@",
      page: "@"
    },
    template: require("../views/directives/line-chart.directive.html"),
    link: function(scope, el, attrs) {
      scope.options = {
        chart: {
            type: 'lineChart',
            height: 450,
            margin : {
                top: 20,
                right: 20,
                bottom: 40,
                left: 55
            },
            x: function(d){ return d.x; },
            y: function(d){ return d.y; },
            useInteractiveGuideline: true,
            xAxis: {
                axisLabel: 'Time (s)'
            }//,
            // yAxis: {
            //     axisLabel: 'Voltage (v)',
            //     tickFormat: function(d){
            //         return d3.format('.02f')(d);
            //     },
            //     axisLabelDistance: -10
            // },
        }
      }

      // Declare Global Graph Variables
      // var eeg = [], emotion = [];

      /* Initialize Graphs */
      function initGraph() {

          //Data is represented as an array of {x,y} pairs.
          for (var i = 0; i <= 450; i++) { // 1921
              var eeg = [], emotion = [];
              var j = i%30;
              var randomI;

              // if(j == 0) {
              //   randomI = Math.round(Math.random() * 2);
              //   emotion.push({x: i/30, y: randomI});
              // }
              // else {
              //   emotion.push({x: i/30, y: randomI})
              // }
              emotion.push({x: i/30, y: 0})
              eeg.push({x: i/30, y: Math.random() + .5})
          }

          //Line chart data should be sent as an array of series objects.
          return [
              {
                  values: eeg,       //values - represents the array of {x,y} data points
                  key: "EEG Signal", //key  - the name of the series.
                  color: "#F2F2F3"  //color - optional: choose your own line color.
              },
              {
                  values: emotion,
                  key: "Emotional State",
                  color: "#FDAE3D",
                  strokeWidth: 3.5
              }
          ];
      };

      /* Update Graphs */
      function updateGraph(data) {
          var eeg = [], emotion = [];
          var y = 0, index = 0;

          for (var i = 0; i <= 450; i++) { // 1921. 15 seconds
              var j = i%30;

              if(j == 0) {
                y = data[index];
                index = index + 1;
                emotion.push({x: i/30, y: y})
              }
              else {
                emotion.push({x: i/30, y: y})
              }
              eeg.push({x: i/30, y: Math.random() + .5})
          }
          // console.log("... x, y :", xy)
          scope.data[0].values = eeg;
          scope.data[1].values = emotion;
      };


       scope.data = initGraph();
      //console.log("scope.data:", scope.data);
      // console.log("scope.data[0] (eeg signal object):", scope.data[0]);
      // console.log("scope.data[0].values (eeg signal):", scope.data[0].values);

      if(scope.page === "process") {
          scope.options.chart.height = 150;
      }

      if(scope.filename === "buffer") {
        // Catch Data
        SocketFactory.on('script:done', function(message) {
          console.log("in event 'script:done'...");
          console.log('Message:', message);
          //updateGraph(message.data);
          if(message.page === "process") {//vs. "results" for data display
            updateGraph(message.data);
          }
          else {
            updateGraph(message.data);
          }
        });

      }
    }
  }
}
