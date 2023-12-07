// var myPolyline;
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

  // Polyline Coordinates
  var lineCoords = [
    new google.maps.LatLng(33.5362475, -111.9267386),
    new google.maps.LatLng(33.5104882, -111.9627875),
    new google.maps.LatLng(33.5004686, -111.9027061),
  ];

  // Styling & Controls
  myPolyline = new google.maps.Polyline({
    path: lineCoords,
    draggable: true, // turn off if it gets annoying
    editable: true,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
  });

  myPolyline.setMap(map);

  google.maps.event.addListener(
    myPolyline.getPath(),
    "insert_at",
    getPolylineCoords
  );
  google.maps.event.addListener(
    myPolyline.getPath(),
    "remove_at",
    getPolylineCoords
  );
  google.maps.event.addListener(
    myPolyline.getPath(),
    "set_at",
    getPolylineCoords
  );
}

// Display Coordinates in WKT format below map
function getPolylineCoords() {
  var len = myPolyline.getPath().getLength();
  var wktStr = "LINESTRING(";

  for (var i = 0; i < len; i++) {
    var latLng = myPolyline.getPath().getAt(i);
    wktStr += latLng.lng() + "  ,  " + latLng.lat();

    if (i < len - 1) {
      wktStr += ", ";
    }
  }

  wktStr += ")";
  document.getElementById("info").innerHTML = wktStr;
}

function copyToClipboard(text) {
  window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}
