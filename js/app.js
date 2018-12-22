//TODO
//3. ERROR messages that are user facing
//5. MOBILE MOBILE MOBILE



//Google API Key AIzaSyAYCbLWQnPsQ4oVA-aKScMVuw-aHOsNOdA

const YELP_KEY = 'Bearer TVtMc88xqJ8TXDzfM3_rMKVdDwtr3mZYelU2uQtL-vFOLw5UHR9WhMI7FTY0eR5xbt4XrOrWXL4dQntTjXPWQc5PLmvubaitZsm7_iNSJ0W2G9c0WCiTEYqKk2ocXHYx';
const alpharettaCenter = {lat: 34.0754, lng: -84.2941};

String.prototype.replaceAll = function(str1, str2, ignore)
{
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
}



let createMarker;

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

let map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: alpharettaCenter,
        zoom: 16,
        minZoom: 12,
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


    createMarker = function (name, desc,imgUrl, lat, lng) {
        let contentString = '<div class="info-window">' +
            '<div style="background: url(' + imgUrl+ ');" class="info-window-img"></div>' +
            '<h1 class="info-window-name">'+ name +'</h1>' +
            '<p class="info-window-p"> Rating: ' + desc + '/5 Stars on Yelp</p>' +
            '</div>';
        let infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        let marker = new google.maps.Marker({
            position: {lat: lat, lng: lng},
            map: map,
            icon: 'img/markergreen.png',
            title: 'center'
        });

        google.maps.event.addListener(map, 'click', function() {
            infowindow.close();
        });

        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });

        return marker
    }
}



window.onload = function () {

    function AppViewModel() {

        let self = this;

        loadYelpData(['hotel', 'food', 'shopping'])

        self.locations = ko.observableArray();

        self.markers = ko.observableArray();

        self.addLocal = function () {
            self.locations.push({name: "New at " + new Date()});
        };

        self.removeLocal = function (place) {
            self.locations.remove(this);
        }

        self.openMarker = function (marker) {
            google.maps.event.trigger(self.markers()[marker.id], 'click');
        }

        // Get Yelp Data
        function loadYelpData(searchTerms) {
            let idCounter = 0;
            for (c = 0; c < searchTerms.length; c++) {
                let xhttp = new XMLHttpRequest();
                let searchURL = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=' + searchTerms[c] + '&latitude=' + alpharettaCenter.lat + '&longitude=' + alpharettaCenter.lng;
                xhttp.open('GET', searchURL)
                xhttp.setRequestHeader('Authorization', YELP_KEY)
                xhttp.send();
                xhttp.onload = function () {
                    let jsonResponse = JSON.parse(xhttp.response);
                    for (i = 0; i < jsonResponse['businesses'].length; i++) {

                        let name = jsonResponse['businesses'][i]['name'].replaceAll('-', ' ')
                        name = name.replaceAll('alpharetta', '')
                        name = name.toUpperCase();
                        let category = searchTerms[c];

                        self.locations.push({name: name, category: category, id: idCounter});

                        idCounter++;

                        let desc = jsonResponse['businesses'][i]['rating'];
                        let imgUrl = jsonResponse['businesses'][i]['image_url'];
                        let lng = jsonResponse['businesses'][i]['coordinates']['longitude'];
                        let lat = jsonResponse['businesses'][i]['coordinates']['latitude'];

                        self.markers.push(createMarker(name, desc, imgUrl, lat, lng));

                    }
                }
                xhttp.onerror = function () {
                    console.log('err')
                }
            }
        }

        loadYelpData(['hotel', 'food', 'shopping'])

    }

    ko.applyBindings(new AppViewModel());


}