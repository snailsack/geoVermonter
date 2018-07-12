

var myMap = L.map('map').setView([43.78886, -72.7317], 7);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
}).addTo(myMap);

let vermontBorder = L.geoJSON(border_data);
vermontBorder.addTo(myMap);

console.log({county_border_data});
let vermontCounties = L.geoJSON(county_border_data);
// vermontCounties.addTo(myMap);

let maxLon = -73.3654;
let minLon = -71.5489;
let maxLat = 45.0065;
let minLat = 42.739;


// function start() {


let randomLat;
let randomLon;


function getRandomLat() {
  randomLat = Math.random() * (maxLat - minLat) + minLat;
}

function getRandomLon() {
  randomLon = Math.random() * (maxLon - minLon) + minLon;
}



// function getRandomCoordinates() {
//   getRandomLat();
//   getRandomLon();
// }

// getRandomCoordinates();


// let randomLocation = [randomLat, randomLon];
// let pipLocation = [randomLon, randomLat];

// write function that checks if coordinates are in vermont
// function checkPoint() {
//   console.log(randomLocation);
//   console.log(leafletPip.pointInLayer(pipLocation, vermontBorder));
// }


function start() {
  let randomLocation = [randomLat, randomLon];
  let pipLocation = [randomLon, randomLat];

  getRandomLat();
  getRandomLon();
  if (leafletPip.pointInLayer(pipLocation, vermontBorder).length === 1) {
    myMap.setView(randomLocation, 14);
  } else {
    getRandomLat();
    getRandomLon();
    pipLocation = [randomLon, randomLat];
    randomLocation = [randomLat, randomLon];
    start();
  }
}

myMap.dragging.disable();
myMap.doubleClickZoom.disable();



function giveUp() {
  document.getElementById('giveUpText').innerHTML = "Your coordinates were: " + randomLat + ", " + randomLon;
  myMap.setView([43.78886, -72.7317], 7);
}

// JQUERY STUFF
$(document).ready(function () {
  $('#start').click(function () {
    $(this).prop('disabled', true);
    $('#giveUp').prop('disabled', false);
    $('#guessCounty').prop('disabled', false);
  })
  $('#giveUp').click(function () {
    $(this).prop('disabled', true);
    $('#guessCounty').prop('disabled', true);
    $('#start').prop('disabled', false);
  })






});