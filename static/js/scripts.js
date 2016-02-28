function initMap() {
    var mapDiv = document.getElementById('map');
    var map = new google.maps.Map(mapDiv, {
      center: {lat: 48.428611, lng: -123.365556},
      zoom: 14
    });
}

function getRoutes(starting_point, ending_point) {
    console.log(starting_point);
    $.ajax({
      url: '/route',
      type: 'POST',
      data: { start: starting_point, end:ending_point},
      success: function(data) {
          routes = JSON.parse(data)
          console.log(routes);
      }
    });
}

$("#bttn").click(function() {
    starting_point = $("#starting_point").val();
    ending_point = $("#ending_point").val();
    routes = getRoutes(starting_point, ending_point);
});
