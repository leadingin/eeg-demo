module.exports = function(SocketFactory, $http) {
  return {
    restrict: "E",
    replace: true,
    scope: {
      filename: "@"
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

      /*Random Data Generator */
      function getGraph(Data) {
          var eeg = [],
              emotion = []
              ;
          console.log("Data:", Data);
          //Data is represented as an array of {x,y} pairs.
          for (var i = 0; i <= 300; i++) { // 1921
              var j = i%30;
              var randomI;

              if(j == 0) {
                randomI = Math.round(Math.random() * 2);
                emotion.push({x: i/10, y: randomI})
              }
              else {
                emotion.push({x: i/10, y: randomI})
              }
              eeg.push({x: i/10, y: Math.random() + .5})
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

      // scope.data = getGraph(0);
      // console.log("scope.data:", scope.data);
      // console.log("scope.data[0] (eeg signal object):", scope.data[0]);
      // console.log("scope.data[0].values (eeg signal):", scope.data[0].values);

      if(scope.filename === "buffer") {
        // Catch Data
        SocketFactory.on('script:done', function(message) {
          console.log("in event 'script:done'...");
          if(message.status === "done") {
            console.log("... fetching buffer_r.json");
            console.log(message);
            console.log(message.data[0]);

            // Get Data from json buffer object
            var xy = [];
            var x = 0, y;
            for(y in message.data) {
              if(y % 4 == 0) {
                xy.push({x: x, y: parseFloat(message.data[y])})
                x = x+1;
              }
            }
            console.log("... x, y :", xy)

            scope.data = [
              {
                  values: xy,       //values - represents the array of {x,y} data points
                  key: "Blah", //key  - the name of the series.
                  color: "#F2F2F3",  //color - optional: choose your own line color.
              }
            ];

            // $http.get('/static/data/buffer_r.json') // GET request to url (same as viewing in browser)
            //   .then(
            //     function(res) {
            //       // console.log("... retrieved JSON (y-format):", res.data);
            //       // console.log("res:", res);
            //       // console.log("res.data:", res.data);
            //       // console.log("res.data.buffer:", res.data.buffer);
            //       // console.log("res.data.buffer[0]:", res.data.buffer[0]);
            //

            //
            //       // console.log("Updated Values");
            //
            //       //console.log("... x-fromat:", scope.data)
            //       console.log("done.");
            //       //SocketFactory.emit('script:run'); // comment to just once
            //     },
            //     function(err) {
            //       console.log(err);
            //     }); // Wait to fetch THEN success or error
            // SocketFactory.emit('script:run');
          }
        });

      }

      if(scope.filename === "psd") {

      }
    }
  }
}
