// take an array and return geoJson. arr = array object. num = integer for properties.bereich
function getBereich(arr, num){
    let filteredLibrary = arr.filter(function (obj){
        if (obj.properties.bereich == num){
            return true;
        } else {
            return false;
        }
    });
    let bereichJson = {
        type: "FeatureCollection",
        features: filteredLibrary
    };

    return bereichJson;
}


// main 
var map = L.map('map').setView([47.37174,  8.54226], 11);

var openStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// get geoJson daten
let requestURL = 'https://script.google.com/macros/s/AKfycbw4LuhP8G-S_VOAoiuUhHJK5wWdjg-JNYt9ViX1eVt1AcDx2VhWur0QUXPGli3i1lqi/exec';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {

    let data = request.response;
    let features = data.features; 

    let bereich1 = getBereich(features, 1);
    let bereich2 = getBereich(features, 2);
    let bereich3 = getBereich(features, 3);
    let bereich6 = getBereich(features, 6);


    let layer1 = L.geoJSON(bereich1, {
        pointToLayer: function(pointFeature, latlng) {
            let col = pointFeature.properties.color;
            let myIcon = L.divIcon({iconSize: [20, 20], className: 'icon_fig marker_' + col});     
            return L.marker(latlng, {icon: myIcon});
        }
    }).bindPopup(function (layer) {
        let ubName = layer.feature.properties.name;
        let imageUrl = layer.feature.properties.imageUrl;
        var popupContent = ubName + '<br><img src=' + imageUrl + ' style="width:200px;"></img>';
        return popupContent;
    }).addTo(map);
  

  let layer2 = L.geoJSON(bereich2, {
    pointToLayer: function(pointFeature, latlng) {
        let col = pointFeature.properties.color;
        let myIcon = L.divIcon({iconSize: [20, 20], className: 'icon_fig marker_' + col});     
        return L.marker(latlng, {icon: myIcon});
    }
}).bindPopup(function (layer) {
    let ubName = layer.feature.properties.name;
    let imageUrl = layer.feature.properties.imageUrl;
    var popupContent = ubName + '<br><img src=' + imageUrl + ' style="width:200px;"></img>';
    return popupContent;
}).addTo(map);

let layer3 = L.geoJSON(bereich3, {
    pointToLayer: function(pointFeature, latlng) {
        let col = pointFeature.properties.color;
        let myIcon = L.divIcon({iconSize: [20, 20], className: 'icon_fig marker_' + col});     
        return L.marker(latlng, {icon: myIcon});
    }
}).bindPopup(function (layer) {
    let ubName = layer.feature.properties.name;
    let imageUrl = layer.feature.properties.imageUrl;
    var popupContent = ubName + '<br><img src=' + imageUrl + ' style="width:200px;"></img>';
    return popupContent;
}).addTo(map);

let layer6 = L.geoJSON(bereich6, {
    pointToLayer: function(pointFeature, latlng) {
        let col = pointFeature.properties.color;
        let myIcon = L.divIcon({iconSize: [20, 20], className: 'icon_fig marker_' + col});     
        return L.marker(latlng, {icon: myIcon});
    }
}).bindPopup(function (layer) {
    let ubName = layer.feature.properties.name;
    let imageUrl = layer.feature.properties.imageUrl;
    var popupContent = ubName + '<br><img src=' + imageUrl + ' style="width:200px;"></img>';
    return popupContent;
}).addTo(map);

let baseLayer = {
    'Open Street Map': openStreetMap
};

let overlayLayer = {
    'Bereich 1': layer1,
    'Bereich 2': layer2,
    'Bereich 3': layer3,
    'Bereich 6': layer6
}


  L.control.layers( baseLayer, overlayLayer, {
    collapsed: false,
    }
  ).addTo(map);
}
