var map = L.map('map').setView([40.418, -3.702], 13);

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    className: 'map-tiles'
}).addTo(map);
L.control.scale().addTo(map);
/*L.marker([40.418, -3.702], {
    draggable: true
}).addTo(map);
*/
var ar = 1;
L.easyButton('icon ion-home', function () {
    if (ar == 1) {
        ar = 0;
        mostrar();
    } else {
        ar = 1;
        ocultar();
    }
}).addTo(map);
var bounds = [
    [40.423, -3.712],
    [40.418, -3.702]
];

var editableLayers = new L.FeatureGroup();
map.addLayer(editableLayers);

var options = {
position: 'topleft',
draw: {
    polygon: {
    allowIntersection: false, // Restricts shapes to simple polygons
    drawError: {
        color: '#e1e100', // Color the shape will turn when intersects
        message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
    },
    shapeOptions: {
        color: '#97009c'
    }
    },
    polyline: {
        shapeOptions: {
        color: '#f357a1',
        weight: 10
        }
    },
    // disable toolbar item by setting it to false
    polyline: false,
    circle: true, // Turns off this drawing tool
    polygon: true,
    marker: false,
    rectangle: true,
},
edit: {
    featureGroup: editableLayers, //REQUIRED!!
    remove: true
}
};

// Initialise the draw control and pass it the FeatureGroup of editable layers
var drawControl = new L.Control.Draw(options);
map.addControl(drawControl);

var editableLayers = new L.FeatureGroup();
map.addLayer(editableLayers);

map.on('draw:created', function(e) {
var type = e.layerType,
    layer = e.layer;

if (type === 'polyline') {
    layer.bindPopup('A polyline!');
} else if ( type === 'polygon') {
    layer.bindPopup('A polygon!');
} else if (type === 'marker') 
{layer.bindPopup('marker!');}
else if (type === 'circle') 
{layer.bindPopup('A circle!');}
else if (type === 'rectangle') 
{layer.bindPopup('A rectangle!');}


editableLayers.addLayer(layer);
});