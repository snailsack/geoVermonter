

var myMap = L.map('map').setView([43.78886, -72.7317], 7);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
}).addTo(myMap);

let vermontBorder = L.geoJSON(border_data);
vermontBorder.addTo(myMap);

let vermontCounties = L.geoJSON(county_border_data);

let maxLon = -73.3654;
let minLon = -71.5489;
let maxLat = 45.0065;
let minLat = 42.739;

function getRandomLat() {
  return Math.random() * (maxLat - minLat) + minLat;
}

function getRandomLon() {
  return Math.random() * (maxLon - minLon) + minLon;
}

function getRandomPoint() {
  return {
    lat: getRandomLat(),
    lon: getRandomLon()
  }
}



let count = 4;
let point;

function start() {
  count = 4;
  point = getRandomPoint();

  console.log({ point })

  while (leafletPip.pointInLayer([point.lon, point.lat], vermontBorder).length === 0) {
    point = getRandomPoint
  }
  myMap.setView([point.lat, point.lon], 14);

  document.getElementById("score4u").innerHTML = "Your score is 4. Every time you zoom out, it drops by one.";
  L.marker([point.lat, point.lon]).addTo(myMap);
}

function guess() {
  console.log(point);
  document.getElementById("nameEntry").style = "display: block";

  let layerPointWithin = leafletPip.pointInLayer([point.lon, point.lat], vermontCounties)
  console.log({ layerPointWithin });
  console.log(count)
}
let name;
let playerInfo;
let array = [];
let newScore;
let index;
function populateList() {
  
  newScore = document.getElementById("scoreCardList");
  for (index = 0; index < array.length; index++) {
    if (array[index].score === 4) {
      addName();
      console.log(localStorage.highScores.name);
      console.log(localStorage.highScores.count);
    }
  }
  for (index = 0; index < array.length; index++) {
    if (array[index].score === 3) {
      addName();
    }
  }
  for (index = 0; index < array.length; index++) {
    if (array[index].score === 2) {
      addName();
    }
  }
  for (index = 0; index < array.length; index++) {
    if (array[index].score === 1) {
      addName();
    }
  }
}
function submitInitials() {
  name = document.getElementById('input').value;
  playerInfo = { 'name': name, 'score': count };
  // JSON.stringify(array.push(playerInfo));

  document.getElementById('nameEntry').style = 'display: none';
  myMap.setView([43.78886, -72.7317], 7);

}
function addScore() {
  let name = document.getElementById('input').value;
  if(localStorage.getItem('highScores')) {
    console.log(typeof 'highScores')
    let highScoreArray = JSON.parse(localStorage.getItem('highScores'))
    highScoreArray.push('{"name": '+name+ ', "score": '+count+'}')
    localStorage.setItem('highScores', JSON.stringify(highScoreArray))
  } else {
    console.log('321');
    localStorage.setItem('highScores', '{"name": ' + name + ', "score": ' + count + '}')
  }
}


myMap.dragging.disable();
myMap.doubleClickZoom.disable();
myMap.scrollWheelZoom.disable();



function giveUp() {
  document.getElementById('giveUpText').innerHTML = "Your coordinates were: " + point.lat + ", " + point.lon;
  myMap.setView([43.78886, -72.7317], 7);
}

// JQUERY STUFF
$(document).ready(function () {
  $('#start').click(function () {
    $(this).prop('disabled', true);
    $('#giveUp').prop('disabled', false);
    $('#guessCounty').prop('disabled', false);
    $('.leaflet-control-zoom-out').show();
  })
  $('#giveUp').click(function () {
    $(this).prop('disabled', true);
    $('#guessCounty').prop('disabled', true);
    $('#start').prop('disabled', false);
  })

  $('.leaflet-control-zoom-out').click(function () {
    count--;
    $('#score4u').html("Your score is: " + count);
    if (count === 1) {
      $('.leaflet-control-zoom-out').hide();
    }
  })






})