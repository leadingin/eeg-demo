module.exports = function() {
  return {
    restrict: "E",
    replace: true,
    scope: {},
    template: require("../views/directives/scatter-chart.directive.html"),
    link: function(scope, el, attrs) {
      scope.options = {
           chart: {
               type: 'multiChart',
               height: 500,
               margin : {
                   top: 60, 
                   right: 60,
                   bottom: 50,
                   left: 70
               },
               //useInteractiveGuideline: true,
               duration: 500,
               xAxis: {
                   tickFormat: function(d) {
                          return d3.format(',.1f')(d);
                       },
                   axisLabel: 'X Variable',
                   margin: {
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: 0
                    }
               },
               yAxis1: {
                   tickFormat: function(d){
                          return d3.format(',.1f')(d);
                     },
                     axisLabel: 'Y Variable',
                     margin: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                      }

               },
               yAxis2: {
                   tickFormat: function(d){
                       return d3.format(',.1f')(d);
                   }
               }
           }
       };

       scope.data = generateVisual();

       function generateVisual(){
         var data = generateData();
        //  console.log("Data:", data);

        // Visualize data you need
        var testdata = [
          // {
          //     type: "scatter",
          //     values: data[0],//refLine1,       //values - represents the array of {x,y} data points
          //     key: "StressLine", //key  - the name of the series.
          //     color: "#C135AA",  //color - optional: choose your own line color.
          //     size: Math.random(),
          //     shape: 'circle',
          //     yAxis: 1
          // },
          // {
          //     type: "scatter",
          //     values: data[1],//refLine2,
          //     key: "CalmLine",
          //     color: "#33B8CE",
          //     size: Math.random(),
          //     shape: 'circle',
          //     yAxis: 1
          // },
          {
             type: "scatter",
              values: data[2],//scatter1,       //values - represents the array of {x,y} data points
              key: "Stress", //key  - the name of the series.
              color: "#C135AA",  //color - optional: choose your own line color.
              size: Math.random(),
              shape: 'circle',
              yAxis: 1
          },
          {
              type: "scatter",
              values: data[3],//scatter2,
              key: "Calm",
              color: "#33B8CE",
              size: Math.random(),
              shape: 'circle',
              yAxis: 1
          },
          {
              type: "line",
              values: data[6],       //values - represents the array of {x,y} data points
              key: "Classification Boundary", //key  - the name of the series.
              color: "#1FCD4C",  //color - optional: choose your own line color.
              strokeWidth: 2,
              yAxis: 2
          },
          {
              type: "line",
              values: [
                    {x: 1.75, y: 5}, {x: 6, y: 9}, {x: 8, y: 5}, {x: 5,y: 1.5}
                      ],
              key: "Classification Boundary",//"Classification Boundary", //key  - the name of the series.
              color: "#FDAE3D",  //color - optional: choose your own line color.
              yAxis: 2
          }//,

          // Circle Plot Test
          // {
          //     type: "line",
          //     values: data[4],
          //     key: "blah4", //key  - the name of the series.
          //     color: "#FFFFFF",  //color - optional: choose your own line color.
          //     yAxis: 2
          // },
          // {
          //     type: "line",
          //     values: data[5],
          //     key: "blah5", //key  - the name of the series.
          //     color: "#FFFFFF",  //color - optional: choose your own line color.
          //     yAxis: 2
          // },
          // {
          //     type: "line",
          //     values: data[6],
          //     key: "blah6", //key  - the name of the series.
          //     color: "#000000",  //color - optional: choose your own line color.
          //     yAxis: 2
          // }
        ];

         return testdata;
      }

      function generateData(){
        var scatter1 = [], scatter2 = [], curve1 = [], curve2 = [],
            curve3 = [],refLine1 = [], refLine2 = [], degree = 0;

        for(var i = 0; i <= 80; i++){
            // Get points for Stress Line y = x {x: 0-5}
            if(i <= 50) {
                refLine1.push({x: i/10, y: i/10});
            }
            // Get points for Calm Line y = 10 - x {x: 2-8}
            if(i >= 20) {
              refLine2.push({x: i/10, y: -i/10 + 10});
            }

            // Only draw a piece of an ellipse
            if( i >= 15 && i < 35 ) {
              // Draw an ellipse
              curve1.push({x: 180*Math.sin(i/10)/(Math.PI*10), y: 180*Math.cos(i/10)/(Math.PI*10)}); // in radians *20

              // Rotate ellipse 60 degrees
              degree = Math.PI/3;
              curve2.push({
                  x: curve1[i-15].x*Math.cos(degree) - curve1[i-15].y*Math.sin(degree), // PI/3
                  y: curve1[i-15].x*Math.sin(degree) - curve1[i-15].y*Math.cos(degree)
              });
            }
        }

        // Translate the ellipse to fit enclose scatter plot well
        for(var k = 0; k < curve2.length; k++) {
          curve3.push({
              x: curve2[k].x - 0.4,
              y: curve2[k].y + 0.2
          });

        }

        // Add Deviation to reference lines to create cluster plot
        for(var j = 0; j <= 300; j++){
          var pos1, pos2, devx1, devy1, devx2, devy2;
          pos1 = Math.round(Math.random()*50); // Can Round UP
          pos2 = Math.round(Math.random()*60);

          if(pos1 > 10 && pos1 < 40) {
            devx1 = Math.random()*2 - 1;
            devy1 = Math.random()*2 - 1;
          }
          else {
            pos1 = Math.round(Math.random()*50);
            devx1 = Math.random() - 0.5;
            devy1 = Math.random() - 0.5;
          }
          if(pos2 > 10 && pos2 < 50) {
            devx2 = Math.random()*2.5 - 0.5;
            devy2 = Math.random()*2.5 - 0.5;
          }
          else {
            pos2 = Math.round(Math.random()*60);
            devx2 = Math.random() - 0.5;
            devy2 = Math.random() - 0.5;
          }

          scatter1.push(
            {
              x: refLine1[pos1].x + devx1,
              y: refLine1[pos1].y + devy1
            });

          scatter2.push(
            {
              x: refLine2[pos2].x + devx2,
              y: refLine2[pos2].y + devy2
            });
        }
        return [ refLine1, refLine2, scatter1, scatter2, curve1, curve2, curve3 ];
      }
    }
  }
}
