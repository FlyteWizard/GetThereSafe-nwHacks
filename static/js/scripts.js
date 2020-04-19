let map;
let polylines = [];

// initMap
function initMap() {
  // Initialize Map
  map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: 48.428611,
      lng: -123.365556
    },
    zoom: 14
  });

  // Add a listener for when you click on the map -> Show address in the info box
  google.maps.event.addListener(map, "click", function(event) {
    let geocoder = new google.maps.Geocoder();
    let latlngobj = event.latLng;

    // Create a latlng object based on where the user clicked on the map
    let latlng = { 
      lat: parseFloat(latlngobj.lat()),
      lng: parseFloat(latlngobj.lng())
    };
    
    geocoder.geocode({ 
      "location": latlng 
    }, function(event) {
      // Display Address
      let address = event[0].formatted_address;

      document.getElementById("locationCard").style.display = "block";
      document.getElementById("mapLocation").innerText = address;
    });
  });
}

// Map Routes
const mapRoutes = (routes) => {
  let strokeColor;
  let strokeWeight;
  let strokeOpacity;

  for(let route = 0; route < routes.length; route++) {
    let latlngPoints = [];

    for (let latlngPoint = 0; latlngPoint < routes[route][2].length; latlngPoint++) {
      latlngPoints.push({
        lat: routes[route][2][latlngPoint][0],
        lng: routes[route][2][latlngPoint][1]
      });
    }

    strokeColor = "#28a745";
    strokeWeight = 5;
    strokeOpacity = 0.8;

    if(route >= 1) {
      strokeColor = "#6c757d";
      strokeWeight = 2;
      strokeOpacity = 0.5;
    }

    let polyline = new google.maps.Polyline({
      path: latlngPoints,
      geodesic: true,
      strokeColor: strokeColor,
      strokeOpacity: strokeOpacity,
      strokeWeight: strokeWeight
    });

    polyline.setMap(map);
    polylines.push(polyline);
  }

  let infoText = "The best route is highlighted in green and has " + routes[0][0] + " city lights";

  document.getElementById("infoCard").style.display = "block";
  document.getElementById("infoText").innerText = infoText;
}

// Get Routes
const getRoutes = (startingPoint, endingPoint) => {
  document.getElementById("locationCard").style.display = "none";
  document.getElementById("infoCard").style.display = "none";

  const locations = {
    start: startingPoint,
    end: endingPoint
  };

  const options = {
    method: 'POST',
    body: JSON.stringify(locations),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  fetch('/route', options)
    .then((response) => response.json())
    .then((data) => {
      mapRoutes(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// copyCode
const copyCode = () => {
  // Create textarea
  let codeToCopy = document.createElement("textarea");

  // Assign the textarea to the innerHTML of the cssCode
  codeToCopy.value = document.getElementById("mapLocation").innerText;

  // Append to codeToCopy
  document.body.appendChild(codeToCopy);

  // Focus
  codeToCopy.focus();
  // Select
  codeToCopy.select();

  // Copy
  document.execCommand("copy")

  // Remove textarea
  document.body.removeChild(codeToCopy);
}

// Gather and Send Routes
const sendRoutes = () => {
  let startingPoint = document.getElementById("startingLocation").value;
  let endingPoint = document.getElementById("endingLocation").value;

  for(let i = 0; i < polylines.length; i++) {
    polylines[i].setMap(null);
  }

  if(startingPoint && endingPoint) {
    getRoutes(startingPoint, endingPoint);
  }
}

// Prevents Form Refresh On Submit
// Keyboard Submit
document.getElementById("endingLocation").addEventListener("keypress", function(event) {
  if(event.keyCode == 13) {
    event.preventDefault();
    document.getElementById("sendRoutesFunction").click();
  }
});
document.getElementById("startingLocation").addEventListener("keypress", function(event) {
  if(event.keyCode == 13) {
    event.preventDefault();
    document.getElementById("sendRoutesFunction").click();
  }
});
