var map;
var polylines = [];

// initMap
function initMap() {
    // Initiate Google Map
    map = new google.maps.Map(document.getElementById('map'), {
      center: {
          lat: 48.428611, 
          lng: -123.365556
        },
      zoom: 14
    });

    // Add a listener for when you click on the map -> Show address in the info box
    google.maps.event.addListener(map, 'click', function(event) {
        var geocoder = new google.maps.Geocoder();
        latlngobj = event.latLng;
        // Create a latlng object based on where the user clicked on the map
        var latlng = {lat: parseFloat(latlngobj.lat()), lng: parseFloat(latlngobj.lng())};
        geocoder.geocode({'location': latlng}, function(event, result){
            // Add address to the address info box
            var address = event[0].formatted_address;
            $("#mapLocation").text(address);
        });
    });
}

function mapRoute(routes) {
    console.log("mapRoute"); // Error before this
    // For each route create a polyline and add to map
    for(var j = 0; j < routes.length; j++){
        latlngPoints = [];
        // For each lat and lng of the route add to the latlngPoints array
        for(var i = 0; i < routes[j][2].length; i++) {
            latlngPoints.push({lat: routes[j][2][i][0], lng: routes[j][2][i][1]});
        }
        // Choose either small stroke for optional route or big stroke for best route
        var strokeColor = '#00CC00';
        var strokeWeight = 5;
        if(j >= 1){
            strokeColor = '#0000FF';
            strokeWeight = 1.5;
        }
        // Create a polyline out of the array latlngPoints we created
        var polyline = new google.maps.Polyline({
            path: latlngPoints,
            geodesic: true,
            strokeColor: strokeColor,
            strokeOpacity: 0.5,
            strokeWeight: strokeWeight
        });

        polyline.setMap(map);
        polylines.push(polyline);
    }
    // Let user know best path - Always returned as first route in the list of routes. First element
    // of the route is the number of street lights
    $("#info-text").text("Best route found with " + routes[0][0] + " street lights");
    $(".info").show();
}

function getRoutes(starting_point, ending_point) {
    // Hide errors
    $(".error").hide();
    $(".info").hide();
    // Ajax request to server to get best routes

    console.log(starting_point);
    
    $.ajax({
      url: '/route',
      type: 'POST',
      data: { start: starting_point, end: ending_point},
    }).done(function(data) {
        console.log(data); // Error before this
      routes = JSON.parse(data);
      console.log(routes); // Error before this
      mapRoute(routes);
    }).fail(function() {
      $(".error").show();
    }).always(function() {
        $("#mapLocation").text("");
    });
}

$("#bttn").click(function() {
    // When search button is clicked
    starting_point = $("#starting_point").val();
    ending_point = $("#ending_point").val();
    // Remove current path
    for(var i = 0; i < polylines.length; i++) {
        polylines[i].setMap(null);
    }
    // Get the best routes to location based on user inputted values
    routes = getRoutes(starting_point, ending_point);
});
