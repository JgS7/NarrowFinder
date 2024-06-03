var ele = document.getElementById("formu");
if(ele.addEventListener){
    ele.addEventListener("submit", spinnn, false);  //Modern browsers
}else if(ele.attachEvent){
    ele.attachEvent('onsubmit', spinnn);            //Old IE
}

var map = L.map('map', {
    minZoom: 11,
}).setView([40.418, -3.702], 11);

var textoAyuda = "<h1>¡Bienvenido a Narrow Finder!</h1> Con esta aplicación web podrás visualizar las calles estrechas de los distintos distritos de Madrid. <br>Su funcionamiento es sencillo:"
textoAyuda = textoAyuda+"<br><br> 1. Dibuja un polígono sobre el mapa que represente la zona que quieras consultar <br> 2. Establezca el ancho mínimo. <br>3. Pulse al boton consultar."
textoAyuda = textoAyuda+"<br><br>El uso de esta aplicación es completamente orientativo, los resultados pueden variar respecto a la realidad. No se requiere cuenta para su uso y no almacena ningun tipo de dato personal"
textoAyuda = textoAyuda+"<h1>Información adicional: </h1> <span>[+/-]</span> Controla el nivel de zoom <br> <span>[&equiv;]</span> Sirve para desplegar y contraer el menú lateral"
textoAyuda = textoAyuda+"<br> <span>[?]</span> Despliega el menu de ayuda <br> <span>[&#9632;]</span> Dibuja un rectangulo  <br> <span>[&#11091;]</span> Dibuja un poligono de N lados"
var ayudaPopup = L.popup().setContent(textoAyuda);

//función para mostrar la ayuda al entrar
var callBack = function () {
    console.log("Map successfully loaded");
    ayudaPopup.setLatLng(map.getCenter()).openOn(map);
};
//cuando cargue el mapa ayuda
map.whenReady(callBack);

var myBounds = map.getBounds();
map.setMaxBounds(myBounds);

map.on('move moveend', function(){
    if (!myBounds.contains(map.getBounds())) {
        L.popup({className: "popupCenter"})
        .setLatLng(map.getCenter())
        .setContent("Lo sentimos, la aplicación solo funciona en este área (Ayuntamiento de Madrid)")
        .openOn(map);
    }
});

map.on('zoomend', function() {
    if (map.getZoom() === map.getMaxZoom()) {
        L.popup({className: "popupCenter"})
        .setLatLng(map.getCenter())
        .setContent("Ha llegado al zoom máximo de la aplicación")
        .openOn(map);
    }

    if (map.getZoom() === map.getMinZoom()) {
        L.popup({className: "popupCenter"})
        .setLatLng(map.getCenter())
        .setContent("Has llegado al zoom mínimo de la aplicación")
        .openOn(map);
    }
});

tileLayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    className: 'map-tiles'
}).addTo(map);

mostrar();

var ar = 0;
L.easyButton('<span>&equiv;</span>', function () {
    if (ar == 1) {
        ar = 0;
        mostrar();
    } else {
        ar = 1;
        ocultar();
    }
}).addTo(map);

L.easyButton('<span>?</span>', function(btn, map){
    ayudaPopup.setLatLng(map.getCenter()).openOn(map);
    },
    {position: 'topright'}
).addTo(map);

var editableLayers = new L.FeatureGroup();
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
        circle: false, // Turns off this drawing tool
        polygon: true,
        marker: false,
        rectangle: true,
    },
    edit: {
        featureGroup: editableLayers, //REQUIRED!!
        edit: false,
        remove: true
    }
};

// Initialise the draw control and pass it the FeatureGroup of editable layers
var drawControl = new L.Control.Draw(options);
map.addControl(drawControl);

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

    //console.info(layer.getLatLngs());
    //console.log(layer.toGeoJSON().geometry);

    var g = layer.toGeoJSON().geometry.coordinates;
    //esto es un objeto
    validar(g);

    editableLayers.addLayer(layer);
});
