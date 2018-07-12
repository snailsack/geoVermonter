

var myMap = L.map('map').setView([43.78886, -72.7317], 7);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
}).addTo(myMap);

let vermontBorder = L.geoJSON(border_data);
vermontBorder.addTo(myMap);

let  maxLon = -73.3654;
let  minLon = -71.5489;
let  maxLat = 45.0065;
let  minLat = 42.739;


// function start() {


  var randomLat 
  function getRandomLat(){
    randomLat = Math.random() *(maxLat-minLat) + minLat;
  }
  getRandomLat();
  var randomLon 
  function getRandomLon(){
    randomLon = Math.random() *(maxLon-minLon) + minLon;
  }
  getRandomLon();

  var randomLocation = [randomLat, randomLon];
  var pipLocation = [randomLon, randomLat];
  function panTo() {
    if (leafletPip.pointInLayer(pipLocation, vermontBorder)){ 
    myMap.setView(randomLocation, 14);
  } else (panTo());
}

//   document.getElementById('map')=L.map('map').setView([randomLat, randomLon], 18);
  
// }

// function that checks to see if ranom lat lon is within vt boundary Box if not run again

// JQUERY STUFF
$(document).ready(function () {
  $('#start').click(function() {
    $(this).prop('disabled', true);
    $('#giveUp').prop('disabled', false);
    $('#guessCounty').prop('disabled', false);
  })






});