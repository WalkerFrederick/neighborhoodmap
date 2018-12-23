//TODO
//3. ERROR messages that are user facing
//5. MOBILE MOBILE MOBILE

//center of map/alpharetta
const alpharettaCenter = {lat: 34.0754, lng: -84.2941};


//used later for cleaning up names from yelp.
String.prototype.replaceAll = function(str1, str2, ignore)
{
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
}


//creating the 'createMarker' function here, defined in the initMap function
let createMarker;
let delMarker;
let restoreMapMarkers;

document.getElementById('aboutBubble').style.visibility = 'hidden';
document.getElementById('filterBubble').style.visibility = 'hidden';
document.getElementById('locationBubble').style.visibility = 'hidden';

//temp
function showBubble(bubble) {
    if (bubble.childNodes[2].style.visibility == 'hidden') {
        bubble.childNodes[2].style.visibility = 'visible';

    }
    else {
        bubble.childNodes[2].style.visibility = 'hidden';
    }
}

//creating map
let map;
let mapMarkers = [];

//init map
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: alpharettaCenter,
        //defines the initial zoom level
        zoom: 16,
        //defines the most you are allowed to zoom out
        minZoom: 12,
        //disable the default google map controls
        disableDefaultUI: true,
        clickableIcons: false,
        //styles for map, recommend you minimize for readability
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

    //used later to create a marker on the map
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

        mapMarkers.push(marker);

        google.maps.event.addListener(map, 'click', function() {
            infowindow.close();
            for (var i = 0; i < mapMarkers.length; i++) {
                mapMarkers[i].setIcon('img/markergreen.png');
            }
        });

        marker.addListener('click', function() {
            infowindow.open(map, marker);
            marker.setIcon('img/markerred.png');

        });

        return marker
    }

    restoreMapMarkers = function(map) {
        let TMPmapMarkers = mapMarkers;
        for (var i = 0; i < TMPmapMarkers.length; i++) {
            TMPmapMarkers[i].setMap(map);
        }
    }


    delMarker = function (id) {
        marker = mapMarkers[id];
        marker.setMap(null);
    }



}



window.onload = function () {

    function AppViewModel() {

        let self = this;

        self.locations = ko.observableArray();

        self.locationsComplete = ko.observableArray();

        self.filters = ko.observableArray();

        self.markers = ko.observableArray();

        self.errorMessage = ko.observable('' +
            '<div class="error-msg"><span><div class="lds-ring"><div></div><div></div><div></div><div></div></div></span>' +
            '<h1>Hold On...</h1>' +
            '<h2>Page is loading!</h2></div>');

        self.filterLocations = function (category) {

            restoreMapMarkers(map);


            for (var i = 0; i < self.locationsComplete().length; i++) {
                self.locations()[i] = self.locationsComplete()[i]
            }

            for(x in self.locations()) {
                self.locations.remove(function (item) {
                    if(item['category'] != category['filter']){
                        delMarker(item['id']);
                        return item['category'] != category['filter']
                    }

                })
            }


        }

        self.openMarker = function (marker) {
            mapMarkers[marker['id']].setIcon('img/markerred.png');

            google.maps.event.trigger(self.markers()[marker.id], 'click');

        }


        // Get Yelp Data
        function loadYelpData(searchTerms) {
            const YELP_KEY = 'Bearer TVtMc88xqJ8TXDzfM3_rMKVdDwtr3mZYelU2uQtL-vFOLw5UHR9WhMI7FTY0eR5xbt4XrOrWXL4dQntTjXPWQc5PLmvubaitZsm7_iNSJ0W2G9c0WCiTEYqKk2ocXHYx';
            let idCounter = 0;
            let filterSeen = [];
            for (c = 0; c < searchTerms.length; c++) {
                let xhttp = new XMLHttpRequest();
                let searchURL = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=' + searchTerms[c] + '&latitude=' + alpharettaCenter.lat + '&longitude=' + alpharettaCenter.lng;
                xhttp.open('GET', searchURL)
                xhttp.setRequestHeader('Authorization', YELP_KEY)

                xhttp.onreadystatechange = function () {
                    if(xhttp.status !== 200) {
                        self.errorMessage('<div class="error-msg"><span>:(</span>\n' +
                            '    <h1>Sorry, There was a problem loading some data.</h1>\n' +
                            '    <h2>Please try again later!</h2></div>')
                    }
                };

                xhttp.send();
                xhttp.onload = function () {
                    let jsonResponse = JSON.parse(xhttp.response);
                    for (i = 0; i < jsonResponse['businesses'].length; i++) {

                        let name = jsonResponse['businesses'][i]['name'].replaceAll('-', ' ')
                        name = name.replaceAll('alpharetta', '')
                        name = name.toUpperCase();
                        let category = jsonResponse['businesses'][i]['categories'][0]['title'];

                        self.locations.push({name: name, category: category, id: idCounter});
                        self.locationsComplete.push({name: name, category: category, id: idCounter});


                        if (filterSeen.indexOf(category) == -1) {
                            self.filters.push({filter: category});
                            filterSeen.push(category)

                        }
                        idCounter++;

                        let desc = jsonResponse['businesses'][i]['rating'];
                        let imgUrl = jsonResponse['businesses'][i]['image_url'];
                        let lng = jsonResponse['businesses'][i]['coordinates']['longitude'];
                        let lat = jsonResponse['businesses'][i]['coordinates']['latitude'];

                        self.markers.push(createMarker(name, desc, imgUrl, lat, lng));

                    }


                    self.errorMessage('')

                }
                xhttp.onerror = function () {
                    self.errorMessage('<div class="error-msg"><span>:(</span>\n' +
                        '    <h1>Sorry, There was a problem loading some data.</h1>\n' +
                        '    <h2>Please try again later!</h2></div>')
                }
            }

        }

        loadYelpData(['hotel', 'food', 'shopping'])

    }

    ko.applyBindings(new AppViewModel());

}