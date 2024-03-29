///////////////////////////////////////
///// For the route finder-pop-up /////
///////////////////////////////////////

function routeFinder(address){

    navigator.geolocation.getCurrentPosition(function (position){
        successCallback(position, address);
    }, errorCallback);
}

function successCallback(position, address) {

    let latlong = String(position.coords.latitude) + ',' + String(position.coords.longitude) + '&destination=';
    const routeFinderPrefix = 'https://www.google.com/maps/dir/?api=1&origin=';

    const routeUrl = routeFinderPrefix + latlong + address;
    //console.log(routeUrl);
    // Safari in iOS should allow Pop-ups
    window.open(routeUrl);
}

function errorCallback(error) {
    alert("GPS inaktiv!");
}

////////////////////////////////////////////
///// Get library categories as layers /////
////////////////////////////////////////////

function getBereichAndLayer(arr, num){
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

    // using Leaflet Rotated Marker by bbecquet (https://github.com/bbecquet/Leaflet.RotatedMarker)
    return L.geoJSON(bereichJson, {
        pointToLayer: function(pointFeature, latlng) {
            let col = pointFeature.properties.color;
            let myIcon = L.divIcon({iconSize: [20, 20], className: 'icon_fig marker_' + col});     
            return L.marker(latlng, {icon: myIcon, rotationAngle: -45});
        }
    }).bindPopup(function (layer) {
        let ubName = layer.feature.properties.name;
        let imageUrl = layer.feature.properties.imageUrl;
        let iframeUrl = layer.feature.properties.iframe;
        let address = String(layer.feature.properties.address);
        // The iframe contents come from the server of the univ. this solution is not clean - it's only for now...
        var popupContent = ubName + '<br><img src=' + imageUrl + ` style="width:300px;"></img><br><a href="javascript:routeFinder('${address}');">Wegweiser via Google (Bitte Pop-up erlauben)</a><br><iframe src="${iframeUrl}" style="width: 300px;height: 100px;" scrolling="yes" frameborder="0">Ihr Browser unterstützt iframes leider nicht.</iframe>`;
        return popupContent;
    }).addTo(map);
}

////////////////
///// main /////
////////////////

var map = L.map('map').setView([47.37174,  8.54226], 11);

var openStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

var GoogleMap = L.tileLayer('https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}', {
	attribution: "<a href='https://developers.google.com/maps/documentation' target='_blank'>Google Map</a>"
}).addTo(map);


// if a local json file exists, the variable "requestURL" should be the path to the local json file
// get geoJson data
let requestURL = 'https://script.google.com/macros/s/AKfycbw4LuhP8G-S_VOAoiuUhHJK5wWdjg-JNYt9ViX1eVt1AcDx2VhWur0QUXPGli3i1lqi/exec';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {

    let data = request.response;
    let features = data.features; 

    let bereich1 = getBereichAndLayer(features, 1);
    let bereich2 = getBereichAndLayer(features, 2);
    let bereich3 = getBereichAndLayer(features, 3);
    let bereich4 = getBereichAndLayer(features, 4);
    let bereich5 = getBereichAndLayer(features, 5);
    let bereich6 = getBereichAndLayer(features, 6);


    let baseLayer = {
        'Open Street Map': openStreetMap,
        'Google Map': GoogleMap
    };

    let overlayLayer = {
        'Bereich 1': bereich1,
        'Bereich 2': bereich2,
        'Bereich 3': bereich3,
        'Bereich 4': bereich4,
        'Bereich 5': bereich5,
        'Bereich 6': bereich6
    }

    L.control.layers( baseLayer, overlayLayer, {
        collapsed: false,
        }
    ).addTo(map);
}
