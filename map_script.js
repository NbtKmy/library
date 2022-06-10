var map = L.map('map').setView([47.37174,  8.54226], 11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
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
    L.geoJSON(data, {
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
  }

