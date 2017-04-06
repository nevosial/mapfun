function initMap() {

var bangalore = {lat: 12.972442, lng: 77.580643};
var map = new google.maps.Map(document.getElementById('mapspot'), {
  'center' : bangalore,
  //  'center' : latlong;
  'zoom' : 11,
  'mapTypeId' : google.maps.MapTypeId.ROADMAP,
  'draggable' : false,
  'scrollwheel' : false
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
  ];

var infWindow = new google.maps.InfoWindow();
  //var bounds = new
  for(var i=0; i<locations.length; i++)
  {
    var position = locations[i].location;
    var title = locations[i].title;
  //creating the marker
  var marker = new google.maps.Marker({
    map: map,
    position: position,
    title: title,
    animation: google.maps.Animation.DROP
  });
  markers.push(marker);  //pushing the values to the markers.
  marker.addListener('click' , function(){
    infWindow.open(this, infWindow);
  });
}
}

//Function to open the infowindow on clicking the marker.
