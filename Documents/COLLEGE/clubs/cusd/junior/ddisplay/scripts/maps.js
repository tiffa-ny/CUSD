var map;
//var markers = {};

//draws the map background
function DrawMap() {
  var latlng = new google.maps.LatLng(42.46, -76.496506);
  var myOptions =
  {
      zoom: 13,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
  };
  map = new google.maps.Map(document.getElementById("map"), myOptions);
  var bounds = new google.maps.LatLngBounds();
}

//creates an array of markers from the api + populates the map
function MapRoute(msg) {
  //setMapOnAll(null);
  var i = 0;
  var image;
  for (i = 0; i < msg.length; i++) {
    var address = [msg[i].Latitude, msg[i].Longitude];
    var position = new google.maps.LatLng(address[0], address[1]);
    if (msg[i].Direction == 'O') {
      image = './images/bus-icon-outbound.png'
    } else {
      image = './images/bus-icon-inbound.png'
    }
    nested_m = {};
    nested_m['position'] = position;
    nested_m['image'] = image;
    markers[i] = nested_m;
  }
  //populates the map with the markers
  setTimeout(function() {
    for (i = 0; i < msg.length; i++) {
      marker = new google.maps.Marker({
        position: markers[i]['position'],
        map: map,
        icon: markers[i]['image'],
        animation: google.maps.Animation.DROP,
      });
    }
  });
}

//google's set map function, needs to be set to null to delete markers
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
};

  // setTimeout(function() {
  //       clearMarkers();
  //       markers = [];
  //     },5000)


// $(document).ready(function() {
//   MapRoute(msg)
// })

// var markers2;
// function func2(a) {
//   markers2 = a;
//   return markers2;
// };

// var markers3 = func2(data);
// console.log(markers3);


//https://stackoverflow.com/questions/14771422/google-map-v3-auto-refresh-markers-only

// $(function() {
//     var locations = {};//A repository for markers (and the data from which they were constructed).

//     //initial dataset for markers
//     var locs = {
//         1: { info:'11111. Some random info here', lat:-37.8139, lng:144.9634 },
//         2: { info:'22222. Some random info here', lat:46.0553, lng:14.5144 },
//         3: { info:'33333. Some random info here', lat:-33.7333, lng:151.0833 },
//         4: { info:'44444. Some random info here', lat:27.9798, lng:-81.731 }
//     };
//     var map = new google.maps.Map(document.getElementById('map_2385853'), {
//         zoom: 1,
//         maxZoom: 8,
//         minZoom: 1,
//         streetViewControl: false,
//         center: new google.maps.LatLng(40, 0),
//         mapTypeId: google.maps.MapTypeId.ROADMAP
//     });
//     var infowindow = new google.maps.InfoWindow();

// var auto_remove = true;//When true, markers for all unreported locs will be removed.

// function setMarkers(locObj) {
//     if(auto_remove) {
//         //Remove markers for all unreported locs, and the corrsponding locations entry.
//         $.each(locations, function(key) {
//             if(!locObj[key]) {
//                 if(locations[key].marker) {
//                     locations[key].marker.setMap(null);
//                 }
//                 delete locations[key];
//             }
//         });
//     }

// $.each(locObj, function(key, loc) {
//     if(!locations[key] && loc.lat!==undefined && loc.lng!==undefined) {
//         //Marker has not yet been made (and there's enough data to create one).

//         //Create marker
//         loc.marker = new google.maps.Marker({
//             position: new google.maps.LatLng(loc.lat, loc.lng),
//             map: map
//         });

//         //Attach click listener to marker
//         google.maps.event.addListener(loc.marker, 'click', (function(key) {
//             return function() {
//                 infowindow.setContent(locations[key].info);
//                 infowindow.open(map, locations[key].marker);
//             }
//         })(key));

//         //Remember loc in the `locations` so its info can be displayed and so its marker can be deleted.
//         locations[key] = loc;
//     }
//     else if(locations[key] && loc.remove) {
//         //Remove marker from map
//         if(locations[key].marker) {
//             locations[key].marker.setMap(null);
//         }
//         //Remove element from `locations`
//         delete locations[key];
//     }
//     else if(locations[key]) {
//         //Update the previous data object with the latest data.
//         $.extend(locations[key], loc);
//         if(loc.lat!==undefined && loc.lng!==undefined) {
//             //Update marker position (maybe not necessary but doesn't hurt).
//             locations[key].marker.setPosition(
//                 new google.maps.LatLng(loc.lat, loc.lng)
//             );
//         }
//         //locations[key].info looks after itself.
//     }
// });
// }