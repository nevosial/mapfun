function initMap() {

var bangalore = {lat: 12.972442, lng: 77.580643};

var styles = [
  {
    featureType: 'water',
    stylers: [
      { color: '#19a0d8' }
    ]
  },{
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      { color: '#efe9e4' },
      { lightness: -40 }
    ]
  },{
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [
      { lightness: 100 }
    ]
  },{
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      { lightness: -100 }
    ]
  }
];

var map = new google.maps.Map(document.getElementById('mapspot'), {
  'center' : bangalore,
  //  'center' : latlong;
  'zoom' : 12,
  'mapTypeId' : google.maps.MapTypeId.ROADMAP,
  'styles' : styles,
  //'draggable' : false,
  //'scrollwheel' : false
  //'mapTypeControl' : false
  });

var markers = []; //blank array of markers

  //Initialixed the locations with static details
var locations = [
    {title: 'Cubbon Park', location: {lat: 12.973826, lng: 77.590591}},
    {title: 'Bangalore Palace', location: {lat: 12.9987, lng: 77.5920}},
    {title: 'Vidhan Souda', location: {lat: 12.9796, lng: 77.5907}},
    {title: 'HAL Aerospace Museum', location: {lat: 12.9549, lng: 77.6812}},
    {title: 'Bannerghatta National Park', location: {lat: 12.8004, lng: 77.5776}},
    {title: 'ISKCON temple', location: {lat: 13.0096, lng: 77.5511}},
    {title: 'St. Mary\'s Basilica', location: {lat: 12.9842, lng: 77.6044}},
    {title: 'Electronic City', location: {lat: 12.8399, lng: 77.6770}},
    {title: 'Bangalore University', location: {lat: 12.9402, lng: 77.5017}},
    {title: 'Lumbini Gardens', location: {lat: 13.0434, lng: 77.6097}},
    {title: 'St.John Medical College', location: {lat: 12.9295, lng: 77.6202}},
    {title: 'Mount St.Joseph', location: {lat: 12.8688, lng: 77.5899}},
  ];

var infWindow = new google.maps.InfoWindow();

var defaultIcon = makeMarkerIcon('0091ff'); //Icon colors
var highlightedIcon = makeMarkerIcon('FFFF24');

  for(var i=0; i<locations.length; i++)
  {
    var position = locations[i].location;
    var title = locations[i].title;
  //creating the marker
  var marker = new google.maps.Marker({
    //map: map,
    position: position,
    title: title,
    animation: google.maps.Animation.DROP,
    icon : defaultIcon
  });
  markers.push(marker);  //pushing the values to the markers array.

  // listener to popup info window
  marker.addListener('click', function() {
    populateInfoWindow(this, infWindow);
  });

  // listener to color the infowindow on mouseover.
 marker.addListener('mouseover', function(){
   this.setIcon(highlightedIcon);
  });

  // listener to decolor the infowindow when not in focus.
  marker.addListener('mouseout', function(){
    this.setIcon(defaultIcon);
  });
}

document.getElementById('show-listings').addEventListener('click', showListings);
document.getElementById('hide-listings').addEventListener('click', hideListings);

// This function will loop through the markers array and display them all.
function showListings() {
  var bounds = new google.maps.LatLngBounds();
  // Extend the boundaries of the map for each marker and display the marker
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
    bounds.extend(markers[i].position);
  }
  map.fitBounds(bounds);
}

// This function will loop through the listings and hide them all.
function hideListings() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
}


function populateInfoWindow(marker, infWindow) {
  // Check to make sure the infowindow is not already opened on this marker.
  if (infWindow.marker != marker) {
    infWindow.marker = marker;
    infWindow.setContent('<div>' + marker.title + '</div>');
    infWindow.open(map, marker);
    // Make sure the marker property is cleared if the infowindow is closed.
    infWindow.addListener('closeclick',function(){
      infWindow.setMarker = null;
    });
  }
}

/***
//This function uses the StreetViewService which is not available in India.
function populateInfoWindow(marker, infWindow) {
  // Check to make sure the infowindow is not already opened on this marker.
  if (infWindow.marker != marker) {
    // Clear the infowindow content to give the streetview time to load.
    infWindow.setContent('');
    infWindow.marker = marker;
    // Make sure the marker property is cleared if the infowindow is closed.
    infWindow.addListener('closeclick', function() {
      infWindow.marker = null;
    });
    var streetViewService = new google.maps.StreetViewService();
    var radius = 50;
    // In case the status is OK, which means the pano was found, compute the
    // position of the streetview image, then calculate the heading, then get a
    // panorama from that and set the options
    function getStreetView(data, status) {
      if (status == google.maps.StreetViewStatus.OK) {
        var nearStreetViewLocation = data.location.latLng;
        var heading = google.maps.geometry.spherical.computeHeading(
          nearStreetViewLocation, marker.position);
          infWindow.setContent('<div>' + marker.title + '</div><div id="pano"></div>');
          var panoramaOptions = {
            position: nearStreetViewLocation,
            pov: {
              heading: heading,
              pitch: 30
            }
          };
        var panorama = new google.maps.StreetViewPanorama(
          document.getElementById('pano'), panoramaOptions);
      } else {
        infWindow.setContent('<div>' + marker.title + '</div>' +
          '<div>No Street View Found</div>');
      }
    }
    // Use streetview service to get the closest streetview image within
    // 50 meters of the markers position
    streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
    // Open the infowindow on the correct marker.
    infWindow.open(map, marker);
  }
}
***/

// This function takes in a COLOR, and then creates a new marker
// icon of that color. The icon will be 21 px wide by 34 high, have an origin
// of 0, 0 and be anchored at 10, 34).
function makeMarkerIcon(markerColor) {
  var markerImage = new google.maps.MarkerImage(
    'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
    '|40|_|%E2%80%A2',
    new google.maps.Size(21, 34),
    new google.maps.Point(0, 0),
    new google.maps.Point(10, 34),
    new google.maps.Size(21,34));
  return markerImage;
}
}
