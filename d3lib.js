var app = angular.module("myCrimeDemo", []); 
app.controller("myCtrl", function($scope,$http) {
    $scope.products = ["Milk", "Bread", "Cheese"];

        $scope.readCSV = function() {
            var fs=require('fs');
            var data=fs.readFileSync('data.json', 'utf8');
            var words=JSON.parse(data);
            console.log("kbjsjshcjca",words);
            var mydata = JSON.parse(data);
            console.log("cadlling function",mydata);
            
            // // http get request to read CSV file content
            // $http.get('./crime.csv').success($scope.processData);
        };

        function readTextFile(file, callback) {
            var rawFile = new XMLHttpRequest();
            rawFile.overrideMimeType("application/json");
            rawFile.open("GET", file, true);
            rawFile.onreadystatechange = function() {
                if (rawFile.readyState === 4 && rawFile.status == "200") {
                    callback(rawFile.responseText);
                }
            }
            rawFile.send(null);
        }
        
        //usage:
        readTextFile("data.json", function(text){
            var data = JSON.parse(text);
            console.log(data);
        });
    
        $scope.processData = function(allText) {
            // split content based on new line
            var allTextLines = allText.split(/\r\n|\n/);
            var headers = allTextLines[0].split(',');
            var lines = [];
    
            for ( var i = 0; i < allTextLines.length; i++) {
                // split content based on comma
                var data = allTextLines[i].split(',');
                if (data.length == headers.length) {
                    var tarr = [];
                    for ( var j = 0; j < headers.length; j++) {
                        tarr.push(data[j]);
                    }
                    lines.push(tarr);
                }
            }
            $scope.data = lines;
            console.log("$scope.data",$scope.data);
        };

    var data = [{
            "name": "Apples",
            "value": 20,
    },
        {
            "name": "Bananas",
            "value": 12,
    },
        {
            "name": "Grapes",
            "value": 19,
    },
        {
            "name": "Lemons",
            "value": 5,
    },
        {
            "name": "Limes",
            "value": 16,
    },
        {
            "name": "Oranges",
            "value": 26,
    },
        {
            "name": "Pears",
            "value": 30,
    }];

    //sort bars based on value
    data = data.sort(function (a, b) {
        return d3.ascending(a.value, b.value);
    })

    //set up svg using margin conventions - we'll need plenty of room on the left for labels
    var margin = {
        top: 15,
        right: 25,
        bottom: 15,
        left: 60
    };

    var width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var svg = d3.select("#graphic").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scale.linear()
        .range([0, width])
        .domain([0, d3.max(data, function (d) {
            return d.value;
        })]);

    var y = d3.scale.ordinal()
        .rangeRoundBands([height, 0], .1)
        .domain(data.map(function (d) {
            return d.name;
        }));

    //make y axis to show bar names
    var yAxis = d3.svg.axis()
        .scale(y)
        //no tick marks
        .tickSize(0)
        .orient("left");

    var gy = svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)

    var bars = svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("g")

    //append rects
    bars.append("rect")
        .attr("class", "bar")
        .attr("y", function (d) {
            return y(d.name);
        })
        .attr("height", y.rangeBand())
        .attr("x", 0)
        .attr("width", function (d) {
            return x(d.value);
        });

    //add a value label to the right of each bar
    bars.append("text")
        .attr("class", "label")
        //y position of the label is halfway down the bar
        .attr("y", function (d) {
            return y(d.name) + y.rangeBand() / 2 + 4;
        })
        //x position is 3 pixels to the right of the bar
        .attr("x", function (d) {
            return x(d.value) + 3;
        })
        .text(function (d) {
            return d.value;
        });

    var datasetDoNut = {
      apples: [53245, 28479, 19697, 24037, 40245],
      oranges: [200, 200, 200, 200] // previously 5 values, now only 4
    };
    
    var width = 400,
      height = 400,
      radius = Math.min(width, height) / 2;
    
    var enterAntiClockwise = {
      startAngle: Math.PI * 2,
      endAngle: Math.PI * 2
    };
    
    var color = d3.scale.category20();
    
    var pie = d3.layout.pie()
      .sort(null);
    
    var arc = d3.svg.arc()
      .innerRadius(radius - 100)
      .outerRadius(radius - 20);
    
    var svg = d3.select("#chartDiv").append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    
    var path = svg.selectAll("path")
      .data(pie(datasetDoNut.apples))
      .enter().append("path")
      .attr("fill", function(d, i) { return color(i); })
      .attr("d", arc)
      .each(function(d) { this._current = d; }); // store the initial values
    
    d3.selectAll("input").on("change", change);
    
    var timeout = setTimeout(function() {
      d3.select("input[value=\"oranges\"]").property("checked", true).each(change);
    }, 2000);
    
    // var $inputs = $("input[type=radio]");
    // setInterval(function() {
    // var random = Math.floor(Math.random() * $inputs.length);
    // $inputs.each(function(i, node) {
    //    node.checked = (i === random);
    //    if(node.checked){
    //       d3.select("input[value=\"oranges\"]").property("checked", true).each(change);
    //    }
    //    else{
    //       d3.select("input[value=\"apples\"]").property("checked", true).each(change);
    //    }
       
    // });
    // }, 2000);

    function change() {
      clearTimeout(timeout);
      path = path.data(pie(datasetDoNut[this.value])); // update the data
      // set the start and end angles to Math.PI * 2 so we can transition
      // anticlockwise to the actual values later
      path.enter().append("path")
          .attr("fill", function (d, i) {
            return color(i);
          })
          .attr("d", arc(enterAntiClockwise))
          .each(function (d) {
            this._current = {
              data: d.data,
              value: d.value,
              startAngle: enterAntiClockwise.startAngle,
              endAngle: enterAntiClockwise.endAngle
            };
          }); // store the initial values
    
      path.exit()
          .transition()
          .duration(500)
          .attrTween('d', arcTweenOut)
          .remove() // now remove the exiting arcs
    
      path.transition().duration(500).attrTween("d", arcTween); // redraw the arcs
    }
    
    // Store the displayed angles in _current.
    // Then, interpolate from _current to the new angles.
    // During the transition, _current is updated in-place by d3.interpolate.
    function arcTween(a) {
      var i = d3.interpolate(this._current, a);
      this._current = i(0);
      return function(t) {
      return arc(i(t));
      };
    }
    // Interpolate exiting arcs start and end angles to Math.PI * 2
    // so that they 'exit' at the end of the data
    function arcTweenOut(a) {
      var i = d3.interpolate(this._current, {startAngle: Math.PI * 2, endAngle: Math.PI * 2, value: 0});
      this._current = i(0);
      return function (t) {
        return arc(i(t));
      };
    }
    
});