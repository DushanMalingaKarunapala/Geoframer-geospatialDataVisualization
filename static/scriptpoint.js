// var myPoints = [];
function initialize() {
  // Map Center
  var myLatLng = new google.maps.LatLng(33.5190755, -111.9253654);
  // General Options
  var mapOptions = {
    zoom: 12,
    center: myLatLng,
    mapTypeId: google.maps.MapTypeId.RoadMap,
  };
  var map = new google.maps.Map(
    document.getElementById("map-canvas"),
    mapOptions
  );

  // Styling & Controls
  google.maps.event.addListener(map, "click", function (event) {
    addPoint(event.latLng, map);
  });
}

function addPoint(location, map) {
  var marker = new google.maps.Marker({
    position: location,
    map: map,
    draggable: true,
  });

  google.maps.event.addListener(marker, "dragend", function () {
    getPointsCoords();
  });

  getPointsCoords(); // Update coordinates when a new point is added

  myPoints.push(marker);
}

// Display Coordinates in WKT format below map
function getPointsCoords() {
  var wktStr = "MULTIPOINT(";

  for (var i = 0; i < myPoints.length; i++) {
    var latLng = myPoints[i].getPosition();
    wktStr += latLng.lng() + " " + latLng.lat();

    if (i < myPoints.length - 1) {
      wktStr += ", ";
    }
  }

  wktStr += ")";
  document.getElementById("info").innerHTML = wktStr;
}

function copyToClipboard(text) {
  window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}
