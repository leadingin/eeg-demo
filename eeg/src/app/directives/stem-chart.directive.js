module.exports = function() {
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
                // showValues: true,
                // valueFormat: function(d){
                //     return d3.format(',.4f')(d);
                // },
                // duration: 500,
                // xAxis: {
                //     axisLabel: 'Frequency'
                // },
                // yAxis: {
                //     axisLabel: 'Power',
                //     axisLabelDistance: -10
                // }
            }
        };

        function getData2() {
          var psdsum = [],
              thetasum = [],
              randomF = 0.0;

          for(var i = 0; i < 60; i++) { // 256
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

          for(var i = 0; i < 60; i++) { // 256
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
        var initGraph = getData();

        // scope.data = getData();
        // console.log('Init Graph:', initGraph);
        // console.log('Data:', initGraph[0]);
        // scope.data = initGraph[0];
        if(scope.filename == "psd") {
          scope.data = [initGraph[0]]; // Sytax issue
          console.log('Scope.data1:', scope.data);
        }
        if(scope.filename == "theta") {
          scope.data = [initGraph[1]];
          console.log('Scope.data2:', scope.data);
        }
    }
  }
}
