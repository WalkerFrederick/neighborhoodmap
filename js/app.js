//center of map/alpharetta
const alpharettaCenter = {lat: 34.0754, lng: -84.2941};




//creating the marker functions here, defined in the initMap function. used later in my view model
let createMarker;
let delMarker;
let restoreMapMarkers;

let mapError = false;
let onMapError = function () {
    mapError = true;
}



//creating map
let map;
let mapMarkers = [];

//init map and defining the marker related functions
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
            '<div style="background-image: url(' + imgUrl+ ');" class="info-window-img"></div>' +
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
            animation: google.maps.Animation.DROP,
            title: 'center',
        });

        mapMarkers.push(marker);

        google.maps.event.addListener(map, 'click', function() {
            infowindow.close();
            marker.setAnimation(null);
            for (var i = 0; i < mapMarkers.length; i++) {
                mapMarkers[i].setIcon('img/markergreen.png');
            }
        });

        marker.addListener('click', function() {
            infowindow.open(map, marker);
            marker.setIcon('img/markerred.png');
            if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
                marker.setIcon('img/markergreen.png');
                infowindow.close(map, marker);
            } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
            }

        });

        google.maps.event.addListener(infowindow, "closeclick", function()
        {
            marker.setAnimation(null);
            marker.setIcon('img/markergreen.png');
        });

        return marker
    };

    restoreMapMarkers = function(map) {
        let TMPmapMarkers = mapMarkers;
        for (var i = 0; i < TMPmapMarkers.length; i++) {
            TMPmapMarkers[i].setMap(map);
        }
    };


    delMarker = function (id) {
        marker = mapMarkers[id];
        marker.setMap(null);
    }



}


//wait for page to load
window.onload = function () {

    //knockoutJS view model
    function AppViewModel() {

        let self = this;

        self.locations = ko.observableArray();

        self.locationsComplete = ko.observableArray();

        self.filters = ko.observableArray(
            [{filter: 'All'}]
        );

        self.markers = ko.observableArray();


        //this was used for navbar class toggling, definitely revisiting this mess later
        self.aboutBubble = ko.observable('hidden');
        self.filterBubble = ko.observable('hidden');
        self.locationBubble = ko.observable('hidden');
        self.aboutStatus = ko.observable('hidden');
        self.filterStatus = ko.observable('hidden');
        self.locationStatus = ko.observable('hidden');

        //Initializes as a loading popup,
        // displays error if error occurs when getting data,
        // displays nothing if data loads correctly
        self.errorMessage = ko.observable('' +
            '<div class="error-msg"><span><div class="lds-ring"><div></div><div></div><div></div><div></div></div></span>' +
            '<h1>Hold On...</h1>' +
            '<h2>Page is loading!</h2></div>');

        //called by my nav buttons
        self.openBubble = function (bubble) {
            if(bubble == 'about'){
                if(self.aboutBubble() == 'visible'){self.aboutBubble('hidden')}
                else {self.aboutBubble('visible')}
            }
            else if(bubble == 'locations'){
                if(self.locationBubble() == 'visible'){self.locationBubble('hidden')}
                else {self.locationBubble('visible')}
            }
            else if(bubble == 'filter'){
                if(self.filterBubble() == 'visible'){self.filterBubble('hidden')}
                else {self.filterBubble('visible')}
            }
        };

        self.aboutStatus = ko.pureComputed(function() {
            return self.aboutBubble() == 'hidden' ? "hidden" : "visible";
        }, self);

        self.filterStatus = ko.pureComputed(function() {
            return self.filterBubble() == 'hidden' ? "hidden" : "visible";
        }, self);

        self.locationStatus = ko.pureComputed(function() {
            return self.locationBubble() == 'hidden' ? "hidden" : "visible";
        }, self);

        //
        self.filterLocations = function (category) {
            if (category['filter'] == 'All'){
                restoreMapMarkers(map);
                self.locations([]);
                for (var i = 0; i < self.locationsComplete().length; i++) {
                    self.locations.push(self.locationsComplete()[i])

                }
            } else {
                //in case this is not the first filter, we will restore the markers to the original state
                restoreMapMarkers(map);

                self.locations([]);
                for (var i = 0; i < self.locationsComplete().length; i++) {
                    self.locations.push(self.locationsComplete()[i])
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


        };

        //opens a marker if clicked from locations drop down
        self.openMarker = function (marker) {
            mapMarkers[marker['id']].setIcon('img/markerred.png');

            google.maps.event.trigger(self.markers()[marker.id], 'click');

        };



        // Get Yelp Data
        function loadYelpData(searchTerms) {
            //if google maps didn't load, we don't try to get yelp data
            if (mapError == true) {
                self.errorMessage('<div class="error-msg"><span>:(</span>\n' +
                    '    <h1>Sorry, There was a problem loading the google maps data.</h1>\n' +
                    '    <h2>Please try again later!</h2></div>')
            } else {

                const YELP_KEY = 'Bearer TVtMc88xqJ8TXDzfM3_rMKVdDwtr3mZYelU2uQtL-vFOLw5UHR9WhMI7FTY0eR5xbt4XrOrWXL4dQntTjXPWQc5PLmvubaitZsm7_iNSJ0W2G9c0WCiTEYqKk2ocXHYx';
                let idCounter = 0;
                let filterSeen = [];
                for (c = 0; c < searchTerms.length; c++) {
                    let xhttp = new XMLHttpRequest();
                    let searchURL = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=' + searchTerms[c] + '&latitude=' + alpharettaCenter.lat + '&longitude=' + alpharettaCenter.lng;
                    xhttp.open('GET', searchURL);
                    xhttp.setRequestHeader('Authorization', YELP_KEY);

                    xhttp.onreadystatechange = function () {
                        if (xhttp.status !== 200) {
                            //if an error occurs, display error message
                            self.errorMessage('<div class="error-msg"><span>:(</span>\n' +
                                '    <h1>Sorry, There was a problem loading some data.</h1>\n' +
                                '    <h2>Please try again later!</h2></div>')
                        }
                    };

                    xhttp.send();
                    xhttp.onload = function () {
                        let jsonResponse = JSON.parse(xhttp.response);
                        for (i = 0; i < jsonResponse['businesses'].length; i++) {
                            let name = jsonResponse['businesses'][i]['name'];
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

                            //pushes markers an observable
                            self.markers.push(createMarker(name, desc, imgUrl, lat, lng));

                        }

                        //if everything goes well, this gets rid of my loading message
                        self.errorMessage('')

                    };
                    xhttp.onerror = function () {
                        self.errorMessage('<div class="error-msg"><span>:(</span>\n' +
                            '    <h1>Sorry, There was a problem loading some data.</h1>\n' +
                            '    <h2>Please try again later!</h2></div>')
                    }
                }
            }
        }
        //starts the process of getting data, defines my three search terms for yelp.
        loadYelpData(['hotel', 'food', 'shopping'])

    }

    ko.applyBindings(new AppViewModel());

};