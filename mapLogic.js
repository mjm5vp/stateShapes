mapboxgl.accessToken = 'pk.eyJ1IjoibWFya21vZWxsZXJ1dmEiLCJhIjoiY2o0dXFsa2F6MG44eTJ4cGwxZ2hrOHVkbCJ9.oXW5yLvO_PXRxDBCwA5DRQ';

var bounds = [
  // [-74.04728500751165, 40.68392799015035], // Southwest coordinates
  // [-73.91058699000139, 40.87764500765852]  // Northeast coordinates
  // [23.810610, -89.558390], // Southwest coordinates
  // [48.854057, -63.211476]  // Northeast coordinates

  [-130.558390, 23.810610], // Southwest coordinates
  [-63.211476, 50.854057]  // Northeast coordinates

];

var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/satellite-streets-v9', //stylesheet location
    // center: [-74.50, 40], // starting position
    zoom: 3, // starting zoom
    maxBounds: bounds
});

map.on("load", function() {
    map.addSource("national-park", {
        "type": "geojson",
        "data": {
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        [
                          [-121.353637, 40.584978],
                          [-121.284551, 40.584758],
                          [-121.275349, 40.541646],
                          [-121.246768, 40.541017],
                          // [-121.251343, 40.423383],
                          // [-121.326870, 40.423768],
                          // [-121.360619, 40.434790],
                          // [-121.363694, 40.409124],
                          // [-121.439713, 40.409197],
                          // [-121.439711, 40.423791],
                          // [-121.572133, 40.423548],
                          // [-121.577415, 40.550766],
                          [-121.539486, 40.558107],
                          [-121.520284, 40.572459],
                          [-121.487219, 40.550822],
                          [-121.446951, 40.563190],
                          [-121.370644, 40.563267],
                          [-121.353637, 40.584978]
                        ]
                    ]
                }
            }, {
                "type": "Feature",
                "properties": {
                    "description": "<strong>Make it Mount Pleasant</strong><p><a href=\"http://www.mtpleasantdc.com/makeitmtpleasant\" target=\"_blank\" title=\"Opens in a new window\">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>"
                  },
                "geometry": {
                    "type": "Point",
                    "coordinates": [-121.415061, 40.506229]
                }
            }, {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-121.505184, 40.488084]
                }
            }, {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-121.354465, 40.488737]
                }
            }]
        }
    });

    map.addLayer({
        "id": "park-boundary",
        "type": "fill",
        "description": "Hello World",
        "source": "national-park",
        'minzoom': 7,
        "paint": {
            "fill-color": "#888888",
            "fill-opacity": 0.4
        },
        "filter": ["==", "$type", "Polygon"]
    });

    map.addLayer({
        "id": "park-volcanoes",
        "type": "circle",
        "description": "Hello World",
        "source": "national-park",
        'minzoom': 7,
        "paint": {
            "circle-radius": 6,
            "circle-color": "#B42222"
        },
        "filter": ["==", "$type", "Point"],
    });
});

    map.on('click', function (e) {
    console.log(JSON.stringify(e.point) + JSON.stringify(e.lngLat))
    console.log(map.getZoom())
        // e.point is the x, y coordinates of the mousemove event relative
        // to the top-left corner of the map

            // e.lngLat is the longitude, latitude geographical position of the event


});

// Center the map on the coordinates of any clicked symbol from the 'symbols' layer.
map.on('click', 'park-volcanoes', function (e) {
    map.flyTo({center: e.features[0].geometry.coordinates});
    new mapboxgl.Popup()
    .setLngLat(e.features[0].geometry.coordinates)
    .setHTML(e.features[0].properties.description)
    .addTo(map);
});

// Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
map.on('mouseenter', 'park-volcanoes', function () {
    map.getCanvas().style.cursor = 'pointer';
});

// Change it back to a pointer when it leaves.
map.on('mouseleave', 'park-volcanoes', function () {
    map.getCanvas().style.cursor = '';
});
