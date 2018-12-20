//Google API Key AIzaSyAYCbLWQnPsQ4oVA-aKScMVuw-aHOsNOdA


//  XHR
var xhttp = new XMLHttpRequest();


//My Google API key
const GoogleAPIurl =    'https://maps.googleapis.com/maps/api/js?key=' +
                        'AIzaSyAYCbLWQnPsQ4oVA-aKScMVuw-aHOsNOdA' +
                        '&callback=initMap';

xhttp.open('GET', GoogleAPIurl);
xhttp.send();

var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    });
}