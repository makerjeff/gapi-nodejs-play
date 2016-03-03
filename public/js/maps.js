/**
 * Created by jeffersonwu on 2/20/16.
 * Moving all maps.html code to here
 */


//define my location
var myLocation = {lat: 34.008928, lng: -118.491824};
var furtherLocation = {lat:34.015, lng: -118.491824};

//MAP VARS
var map;
var marker1;
var marker1Text = 'This is where I work.';
var marker2;
var marker2Text = 'This is a little further away from work.';

//array of custom test markers. should be schema for custom data from TWITTER SPARTAN SERVER
var markerArray = [
    {
        coordinates: {lat: 34.00916284045981, lng: -118.49162578582764},
        text:"my first location! ate an icecream cone.",
        url:'http://www.makerjeff.com',
        url_text:'first location link'
    },
    {
        coordinates: {lat: 34.0083535145767, lng: -118.49121809005737},
        text:"my second location! shined a random person's shoes. https://t.co/FXA5GQn0V1, https://t.co/pLr3DIPQev",
        url:'http://www.makerjeff.com',
        url_text:'second location link'
    },
    {
        coordinates: {lat: 34.00747303040494, lng: -118.49031686782837},
        text:"my third location! rode a bicycle into a wall.",
        url:'http://www.makerjeff.com',
        url_text:'third location link'
    },
    {
        coordinates: {lat: 34.006850460329446, lng: -118.49122881889342},
        text:"my fourth location! picked up a stranger.",
        url:'http://www.makerjeff.com',
        url_text:'fourth location link'
    },
    {
        coordinates: {lat: 34.00606779433055, lng: -118.49043488502504},
        text:"my fifth location! dropped off a stranger.",
        url:'http://www.makerjeff.com',
        url_text:'fifth location link'
    },
    {
        coordinates: {lat: 34.005694246651856, lng: -118.49111080169676},
        text:"my sixth location! was stalked by a creeper.",
        url:'http://www.makerjeff.com',
        url_text:'sixth location link'
    },
    {
        coordinates: {lat: 34.00645023429936, lng: -118.49170088768005},
        text:"my seventh location! took a nap.",
        url:'http://www.makerjeff.com',
        url_text:'seventh location link'
    },
    {
        coordinates: {lat: 34.00698386858699, lng: -118.49230170249939},
        text:"my eighth location! had a child.",
        url:'http://www.makerjeff.com',
        url_text:'eighth location link'
    },
    {
        coordinates: {lat: 34.008175639722324, lng: -118.49348187446593},
        text:"my ninth location! fed the child.",
        url:'http://www.makerjeff.com',
        url_text:'ninth location link'
    },
    {
        coordinates: {lat: 34.00903832928754, lng: -118.4937286376953},
        text:"my tenth location! my life is all about the child.",
        url:'http://www.makerjeff.com',
        url_text:'tenth location link'
    },
    {
        coordinates: {lat: 34.00951858566024, lng: -118.49505901336669},
        text:"my eleventh location! I'm getting old.",
        url:'http://www.makerjeff.com',
        url_text:'11th location link'
    },
    {
        coordinates: {lat: 34.01028343279438, lng: -118.49608898162842},
        text:"my 12th location! going to retire soon.",
        url:'http://www.makerjeff.com',
        url_text:'12th location link'
    },
    {
        coordinates: {lat: 34.00746413657887, lng: -118.4997797012329},
        text:"...",
        url:'http://www.makerjeff.com',
        url_text:'13th location link'
    },
    {
        coordinates: {lat: 34.00579208072652, lng: -118.49766612052917},
        text:"(floating corpse down the river)",
        url:'http://www.makerjeff.com',
        url_text:'14th location link'
    }
];




// ====== EVENTS ======

var addPinButton = document.getElementById('add_pin_button');
addPinButton.addEventListener('click', function(event){
    event.preventDefault;

    addPin();
});

var killButton = document.getElementById('remove_bar_button');
killButton.addEventListener('click', function(event){
    //remove nav
    document.getElementById('nav').parentNode.removeChild(document.getElementById('nav'));
});

// ====== HELPER FUNCTIONS AND CALLBACKS ========

/**
 * Manually add pins with debug interface.
 */
function addPin() {
    var lat = Number(document.getElementById('lat_field').value);
    var lng = Number(document.getElementById('lng_field').value);

    if (lat == '' || lng == '') {
        alert('please enter values!');
    } else {
        console.log('lat: ' + lat + ', long: ' + lng);

        //create markers: position, map, title
        var marker = new google.maps.Marker({position: {lat: lat, lng: lng}, map: map, title: (lat + lng).toString()});

        //clear fields
//            document.getElementById('lat_field').value = '';
//            document.getElementById('lng_field').value = '';
    }
}

/**
 * JSONP Callback From Google
 */
function initAll () {
    //put maps loading logic here

    initMap();
    initMarkers(markerArray);
    //initDrawing();
    drawTravelPath(markerArray);
    //findAverageCoords(markerArray);
}

/**
 * Init and Draw main Map
 */
function initMap() {
    //create new map object centered on myLocation
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat:findAverageCoords(markerArray).lat, lng:findAverageCoords(markerArray).lng},
        //zoom level: 1=world, 5=landmass/continent, 10=city, 15=streets, 20=building
        zoom: 17
    });

    //===== MAP STYLES =====
//        map.set('styles', [
//            {
//                featureType: 'road',
//                elementType: 'geometry',
//
//                stylers: [
//                    {color: '#000000'},
//                    {weight: '0.25'}
//                ]
//            },
//            {
//                featureType: 'road',
//                elementType: 'labels',
//
//                stylers: [
//                    {saturation: -100},
//                    {invert_lightness: true}
//                ]
//            },
//            {
//                featureType: 'landscape',
//                elementType: 'geometry',
//
//                stylers: [
//                    {hue: '#ffff00'},
//                    {gamma: 1.4},
//                    {saturation: 82},
//                    {lightness: 96}
//                ]
//            },
//            {
//                featureType: 'poi.school',
//                elementType: 'geometry',
//
//                stylers: [
//                    {hue: '#ffff700'},
//                    {lightness: -15},
//                    {saturation: 99}
//                ]
//            },
//            {
//                featureType: 'poi',
//                elementType: 'geometry',
//                stylers: [
//                    { visibility: 'off' }
//                ]
//            },
//            {
//                featureType: 'poi.school',
//                elementType: 'geometry',
//
//                stylers: [
//                    { visibility: 'on' },
//                    { hue: '#fff700' },
//                    { lightness: -15 },
//                    { saturation: 99 }
//                ]
//            }
//        ]); // == MAP STYLES - END ==

    // ===== MANUAL TEST MARKERS ======
    //create first marker at 180LA on construction
    //marker1 = new google.maps.Marker({position: myLocation, map: map, title: marker1Text});

    //create second marker, then add it later
    //marker2 = new google.maps.Marker({position: furtherLocation, title: marker2Text});
    //add now
    //marker2.setMap(map);




    // ===== CUSTOM INFO WINDOWS =====

    var location = {lat: -25.363, lng: 131.044};
    var contentString = '<b>My Favorite Window</b>' +
        '<p>Favorite window paragraph with awesome info. Blah blah blah<br> ' +
        'blah blah more info here and there blah blah blah.</p> <img src="./img/heart-outline-sm.png">';

    var marker3 = new google.maps.Marker({
        position: location,
        map: map,
        title: 'My Favorite Title'
    });

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    marker3.addListener('click', function(){
        infowindow.open(map, marker3);
    });
}

// ====== HELPER FUNCTIONS AND CALLBACKS =====
/**
 * Initialize google maps drawing controls (not used)
 */
function initDrawing() {
    //DRAWING MANAGER
    var drawingManager = new google.maps.drawing.DrawingManager(
        {
            drawingMode: google.maps.drawing.OverlayType.MARKER,
            drawingControl: true,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: [
                    google.maps.drawing.OverlayType.MARKER,
                    //google.maps.drawing.OverlayType.CIRCLE,
                    //google.maps.drawing.OverlayType.POLYGON,
                    google.maps.drawing.OverlayType.POLYLINE,
                    //google.maps.drawing.OverlayType.RECTANGLE
                ]
            },
            markerOptions: {
                icon: './img/heart-outline-sm.png'
            },

            circleOptions: {
                fillColor: '#ffff00',
                fillOpacity: 1,
                strokeWeight: 1,
                clickable: true,
                editable: true,
                zIndex:1
            },

            rectangleOptions: {
                fillColor: 'rgba(255,0,0,1.0)',
                fillOpacity: 0.25,
                strokeWeight: 1,
                clickable: true,
                editable: true,
                zIndex:1
            }
        }
    );

    drawingManager.setMap(map);
    drawingManager.setOptions(
        {
            drawingControl: true
        }
    );
}

/**
 * Find the average of the coordinates and returns lat-lng object
 * @param arr Lat-Lng array to parse. Should follow TWITTER SPARTAN SERVER schema.
 */
function findAverageCoords(arr){
    var returnObject = {lat:0, lng:0};

    var latArray = [];
    var lngArray = [];

    var sumLat = 0;
    var sumLng = 0;

    var avgLat = 0;
    var avgLng = 0;

    //add value to array
    arr.forEach(function(element, index, array){

        //load up the lat array
        latArray.push(array[index].coordinates.lat);

        //load up the lng array
        lngArray.push(array[index].coordinates.lng);
    });

    //find average lat
    for(var i = 0; i < latArray.length; i++) {
        sumLat += latArray[i];
        sumLng += lngArray[i];
    }

    avgLat = sumLat / latArray.length;
    avgLng = sumLng / lngArray.length;

    returnObject.lat = avgLat;
    returnObject.lng = avgLng;

   //debug console.log('avg lat: ' + returnObject.lat + ', avg lng: ' + returnObject.lng);

    return returnObject;
}

function initMarkers(arr){
// ===== AUTO MARKERS BASED ON MARKER ARRAY ======
    arr.forEach(function(element, index, array){

        console.log(array[index].text);
        console.log(array[index].coordinates.lat);
        //
        var lat = array[index].coordinates.lat;
        var lng = array[index].coordinates.lng;

        //create marker
        var marker = new google.maps.Marker(
            {
                position: array[index].coordinates,
                map: map,
                title: array[index].text,
                icon:'./img/heart-outline-sm.png'
                // animation: google.maps.Animation.DROP
            });

        //create info window for marker
        var infowindow = new google.maps.InfoWindow(
            {
                content: '<b>' +
                array[index].text +
                '</b>' +
                '<p> Some information about the location here at ' +
                array[index].coordinates.lat +
                ',' +
                array[index].coordinates.lng +
                '</p>'+
                '<p>' +
                '<a href="' +
                array[index].url +
                '" target="_blank">' +
                array[index].url_text +
                '</a>' +
                '</p>'
            }
        );

        //create click listener to pop open infoWindow
        marker.addListener('click', function(){
            infowindow.open(map, marker);

            //animations
            //if(marker.getAnimation() !== null) {
            //    marker.setAnimation(null);
            //} else {
            //    marker.setAnimation(google.maps.Animation.BOUNCE);
            //}
        });
    });
}
/**
 * Draw travel path based on array parameter
 * @param array Array of lat-long coordinate objects (see GeoJSON spec)
 */
function drawTravelPath(array){
    //temp array
    var travelPathCoordinates = [];

    console.log('coordinate dump!:')

    array.forEach(function(element, index, array){
        console.log('pushing: ' + array[index].coordinates.lat + ', ' + array[index].coordinates.lng + ' to array');

        //push to temp array
        travelPathCoordinates.push(array[index].coordinates);
    });

    var travelPath = new google.maps.Polyline({
        path: travelPathCoordinates,
        geodesic: true,
        strokeColor: '#F7005A',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });

    travelPath.setMap(map);
}

//TODO: consolidate all draw functions to one function
//TODO: namespace this app to prevent contamination
//TODO: try Draw Library https://developers.google.com/maps/documentation/javascript/drawinglayer
