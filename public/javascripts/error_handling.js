
function error_box(error){
    
    //si envio mensaje me lo divide en dos. es en el caso del ancho. en el caso del bbox me split coords
    var arr = error.split(",");
    //console.log(arr);
    //console.log(error);

    //variable guardar las coordenadas adaptadas para geoJSON
    var cords = [];
    storeCoordinate(cords,arr);
    //console.log(cords);
    //console.log("las coords bbox return");
    
    //Si son las coordenadas del bbox no pasa nada
    if (!isNaN(parseFloat(arr[0]))) {

        var geojson = {"type": "FeatureCollection","features":[{"type": "Feature","properties": {"name": "Dinagat Islands"},"geometry":{"type":"MultiPolygon","coordinates":[[cords]]}}]};
        //console.log(geojson);

        //con esto no lo puedo editar
        //console.log(dibujar(geojson));

        //con esto lo puedo borrar después de borrar un poligono creado....
        L.geoJSON(geojson,{
            style:    
            {
                color: "pink"
            }}).addTo(editableLayers);
        document.getElementById("box").value = error;
    }
    // si no ha creado bbox le da el mensaje de error
    else {
        L.popup({className: "red-error"})
        .setLatLng(map.getCenter())
        .setContent(error)
        .openOn(map);
    }
}

function error_a(error){
    //si hay ancho de via lo pone
    if (!isNaN(parseFloat(error))) {
        document.getElementById("anchoVia").value = error;
    }
    //si no hay ancho le da el mensaje de error
    else {
        document.getElementById("anchoVia").style.setProperty("--c", "red");
        document.getElementById("anchoVia").placeholder = error;
    }
}