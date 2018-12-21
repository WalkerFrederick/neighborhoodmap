//TODO
//2. KnockoutJS baby
//3. ERROR messages that are user facing
//4. MAP markers
//5. MOBILE MOBILE MOBILE



//Google API Key AIzaSyAYCbLWQnPsQ4oVA-aKScMVuw-aHOsNOdA

const YELP_KEY = 'Bearer TVtMc88xqJ8TXDzfM3_rMKVdDwtr3mZYelU2uQtL-vFOLw5UHR9WhMI7FTY0eR5xbt4XrOrWXL4dQntTjXPWQc5PLmvubaitZsm7_iNSJ0W2G9c0WCiTEYqKk2ocXHYx';
const alpharettaCenter = {lat: 34.0754, lng: -84.2941};

// Get Yelp Data
function loadYelpData() {
    let xhttp = new XMLHttpRequest();
    let searchURL = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=shopping&latitude=' + alpharettaCenter.lat + '&longitude=' + alpharettaCenter.lng;

    yelpResponseListener = function() {
        let yelpJson = JSON.parse(this.responseText);
        console.log(yelpJson['businesses'][1]['coordinates'])
    }

    xhttp.addEventListener("load", yelpResponseListener);
    xhttp.open('GET', searchURL)
    xhttp.setRequestHeader('Authorization', YELP_KEY)
    xhttp.send();
    xhttp.onload = function () {

    }
    xhttp.onerror = function () {
    };
}

loadYelpData();



var map;

document.getElementById('aboutBubble').style.visibility = 'hidden';
document.getElementById('filterBubble').style.visibility = 'hidden';
document.getElementById('locationBubble').style.visibility = 'hidden';

function showBubble(bubble) {
    if (bubble.childNodes[2].style.visibility == 'hidden') {
        bubble.childNodes[2].style.visibility = 'visible';

    }
    else {
        bubble.childNodes[2].style.visibility = 'hidden';
    }
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: alpharettaCenter,
        zoom: 16,
        disableDefaultUI: true,
        clickableIcons: false,
        styles: [
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ebe3cd"
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#523735"
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#f5f1e6"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#c9b2a6"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#dcd2be"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#ae9e90"
                    }
                ]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dfd2ae"
                    }
                ]
            },
            {
                "featureType": "poi",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dfd2ae"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#93817c"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#a5b076"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#447530"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f1e6"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#fdfcf8"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f8c967"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#e9bc62"
                    }
                ]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e98d58"
                    }
                ]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#db8555"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#806b63"
                    }
                ]
            },
            {
                "featureType": "transit",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dfd2ae"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#8f7d77"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#ebe3cd"
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dfd2ae"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#b9d3c2"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#92998d"
                    }
                ]
            }
        ],

    });
    var contentString = '<h1>hello world</h1>';
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    var marker = new google.maps.Marker({
        position: alpharettaCenter,
        map: map,
        title: 'center'
    });
    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
}

window.onload = function () {
    let locations = ko.observableArray();// Initially an empty array
    locations.push({name: 'Papa Johns', category: 'food'});
    locations.push({name: 'Chinese Place', category: 'food'}); // Adds the value and notifies observers
    console.log(locations());
    ko.applyBindings({
        locations: locations(),
    });
}