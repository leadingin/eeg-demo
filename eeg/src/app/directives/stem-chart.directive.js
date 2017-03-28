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

        function getData() {
          var psdsum = [],
              band1 = [],
              psd = [],
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
          // psdsum.push({ key: "psd", values: psd})
          return [
            {
              key: "psdsum",
              values: psdsum
            }
          ];
        }

        scope.data = getData();
        // [
        //     {
        //         key: "Cumulative Return",
        //         values: [
        //             {
        //                 "label" : "A" ,
        //                 "value" : -29.765957771107
        //             } ,
        //             {
        //                 "label" : "B" ,
        //                 "value" : 0
        //             } ,
        //             {
        //                 "label" : "C" ,
        //                 "value" : 32.807804682612
        //             } ,
        //             {
        //                 "label" : "D" ,
        //                 "value" : 196.45946739256
        //             } ,
        //             {
        //                 "label" : "E" ,
        //                 "value" : 0.19434030906893
        //             } ,
        //             {
        //                 "label" : "F" ,
        //                 "value" : -98.079782601442
        //             } ,
        //             {
        //                 "label" : "G" ,
        //                 "value" : -13.925743130903
        //             } ,
        //             {
        //                 "label" : "H" ,
        //                 "value" : -5.1387322875705
        //             }
        //         ]
        //     }
        // ]

        console.log("scope.data:", scope.data);
    }
  }
}
