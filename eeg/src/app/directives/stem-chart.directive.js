module.exports = function(SocketFactory) {
  return {
    restrict: "E",
    replace: true,
    scope: {
      filename: "@"
    },
    template: require("../views/directives/stem-chart.directive.html"),
    link: function(scope, el, attrs) {
      scope.options = {
        chart: {
                type: 'discreteBarChart',
                height: 200,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 50,
                    left: 55
                },
                x: function(d){return d.label;},
                y: function(d){return d.value;},// + (1e-10);},
                duration: 500,
                xAxis: {
                    axisLabel: 'Frequency',
                    tickFormat: function(d) {
                      if(d % 5 == 0) {
                        return d;
                      }
                    }
                },
                yAxis: {
                    axisLabel: 'Power',
                    axisLabelDistance: -10,
                    tickFormat: function(d){
                        return d3.format('.2f')(d);
                    }
                }
            }
        };

        function getData2() {
          var psdsum = [],
              thetasum = [],
              randomF = 0.0;

          for(var i = 0; i < 64; i++) { // 256
            if(i % 2 == 0) {
              randomF = Math.random();
            }
            else {
              randomF = 0;
            }

            psdsum.push(
              {
                label: i,
                value: randomF,
                color: "#F2F2F3"
              }
            );
          }

          return [
            {
              key: "psdsum",
              values: psdsum
            }
          ];
        }

        function getData() {
          var psdsum = [],
              thetasum = [],
              randomF = 0.0;

          for(var i = 0; i < 64; i++) { // 256 (64 X 4)
            if(i % 2 == 0) {
              // randomF = Math.random();
              randomF = 0;
            }
            else {
              randomF = 0;
            }

            psdsum.push(
              {
                label: i,
                value: randomF,
                color: "#F2F2F3"
              }
            );
            thetasum.push(
              {
                label: i,
                value: randomF,
                color: "#F2F2F3"
              }
            );
          }

          return [
            {
              key: "psdsum",
              values: psdsum
            },
            {
              key: "thetasum",
              values: thetasum
            }
          ];
        }

        //if(scope.get)
        // var initGraph = getData();
        scope.data = getData();

        // scope.data = getData();
        // console.log('Init Graph:', initGraph);
        // console.log('Data:', initGraph[0]);
        // scope.data = initGraph[0];

        if(scope.filename == "psd") {
          // scope.data = [initGraph[1]];
          SocketFactory.on('script:done', function(message) {
            // console.log('PSD update!');
            var psd = [], mag;
            for(var i = 0; i < 64; i++) {
              if(i % 2 == 0)
                mag = Math.random();
              else
                mag = 0;

              psd.push(
                {
                  label: i,
                  value: mag,
                  color: "#F2F2F3"
                });
            }

            // console.log("PSD:", psd);
            scope.data[0].values = psd;
          });
          // console.log('Scope.data2:', scope.data);
        }

        if(scope.filename == "theta") {
          // scope.data = [initGraph[0]]; // Sytax issue
          // console.log('Scope.data1:', scope.data);
          // SocketFactory.on('script:done', function(message) {
          //   console.log('psd update!');
          // }
          var Theta = [], mag;
          SocketFactory.on('script:done', function(message) {
            // console.log('Theta update!');
            for(var i = 0; i < 64; i++) {
              // if(i % 4 == 0 ) {
              //   Theta.push({x: i, y: }); //Number(message.theta[4*i].toFixed(2))
              // }
              // else {
              //   Theta.push({x: i, y: 0});
              // }
              if(i % 2 == 0)
                mag = message.theta[i*4];
              else
                mag = 0;

              Theta.push(
                {
                  label: i,
                  value: mag,
                  color: "#F2F2F3"
                });
            }
            // console.log("Theta data:", scope.data);
            // console.log("Theta data[1]:", scope.data[1]);
            // console.log("Theta:", Theta);
            scope.data[1].values = Theta;
          });
          // console.log('Scope.data2:', scope.data);
        }
    }
  }
}
