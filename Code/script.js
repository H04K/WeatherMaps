  // The svg
  var svg = d3.select("svg"),
      width = +svg.attr("width"),
      height = +svg.attr("height");
// Recuperer la div pour afficher 
  var div = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
  // Map and projection
 
  var projection = d3.geoMercator()
      .center([2, 47]) // GPS of location to zoom on
      .scale(1300) // This is like the zoom
      .translate([width / 2, height / 2])

  // Load external data and boot


 

  let ville = []
 
//<option value="dog">1</option>

    days =document.getElementById('days-select')
      d3.json("./dep.json", function (data) {
          d3.json("meteo.json", function (meto) {
           // days = document.getElementById('test').value
              for(let y =0; y < meto.length;y++){
                document.getElementById('days-select').innerHTML +=   "<option value="+y+">"+y+"</option>"
              }
              for (let i = 0; i < meto[days].station.length; i++) {
                  
                  station = {
                      "name": meto[days].station[i].n,
                      "long": meto[days].station[i].lng,
                      "lat": meto[days].station[i].lat,
                      "temp": meto[days].station[i].t / 100 + " °C",
                      "hours": meto[days].station[i].hours
                  }
                  ville.push(station)
              }
              // Draw the map
              //console.log(ville)
              let point = []
              //"co":[ville[i].long, ville[i].lat]
              for (let i = 0; i < ville.length; i++) {
                  point.push([ville[i].long, ville[i].lat, ville[i].name, ville[i].temp])
              }
              //console.log(point)
              svg.append("g")
                  .selectAll("path")
                  .data(data.features)
                  .enter()
                  .append("path")
                  .attr("fill", "grey")
                  .attr("d", d3.geoPath()
                      .projection(projection)
                  )
              svg.selectAll("circle")
                  .data(point).enter()
                  .append("circle")
                  .attr("cx", function (d) {
                      //console.log(projection(d));
                      return projection(d)[0];
                  })
                  .attr("cy", function (d) {
                      return projection(d)[1];
                  })
                  .attr("r", "4px")
                  .attr("fill", "black")
                  .on("mouseover", myMouseoverFunction)
                  .on("mouseout", myMouseoutFunction)
          })
      })
  

  var myMouseoutFunction = function (d) {
      var circle = d3.select(this);
      circle
          .attr("r", "4px")



  }
  var myMouseoverFunction = function (d) {
      var circle = d3.select(this);
      circle
          .attr("r", "8px")
      console.log(d[2], d[3])
      document.getElementById("temp").innerHTML = d[2] + " " +  d[3] ;

  }