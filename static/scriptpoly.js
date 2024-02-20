//var myPolygon;
function initialize() {
  // Map Center
  //7.448399,80.383500
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
  // Polygon Coordinates
  var triangleCoords = [
    new google.maps.LatLng(33.5362475, -111.9267386),
    new google.maps.LatLng(33.5104882, -111.9627875),
    new google.maps.LatLng(33.5004686, -111.9027061),
  ];
  // Styling & Controls
  myPolygon = new google.maps.Polygon({
    paths: triangleCoords,
    draggable: true, // turn off if it gets annoying
    editable: true,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
  });

  myPolygon.setMap(map);
  //google.maps.event.addListener(myPolygon, "dragend", getPolygonCoords);
  google.maps.event.addListener(
    myPolygon.getPath(),
    "insert_at",
    getPolygonCoords
  );
  //google.maps.event.addListener(myPolygon.getPath(), "remove_at", getPolygonCoords);
  google.maps.event.addListener(
    myPolygon.getPath(),
    "set_at",
    getPolygonCoords
  );
}
// Display Coordinates in WKT format below map
function getPolygonCoords() {
  var len = myPolygon.getPath().getLength();
  var wktStr = "POLYGON((";

  for (var i = 0; i < len; i++) {
    var latLng = myPolygon.getPath().getAt(i);
    wktStr += latLng.lng() + " " + latLng.lat();

    if (i < len - 1) {
      wktStr += ", ";
    }
  }

  // Close the polygon by repeating the first point
  var firstLatLng = myPolygon.getPath().getAt(0);
  wktStr += ", " + firstLatLng.lng() + " " + firstLatLng.lat();

  wktStr += "))";
  document.getElementById("info").innerHTML = wktStr;
}

function copyToClipboard(text) {
  window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}
