
function mostrar() {
    document.getElementById("sidebar").style.width = "20%";
    document.getElementById("map").style.width = "80%";
    document.getElementById("map").style.left = "20%";
    map.invalidateSize();    
}

function ocultar() {
    document.getElementById("sidebar").style.width = "0%";
    document.getElementById("map").style.width = "100%";
    document.getElementById("map").style.left = "0%";
    map.invalidateSize();
}

// SOLUCIONADO, PERO AHORA TENGO QUE VER COMO HACER PARA QUE NO ME SOBREESCRIBA
function validar(bound) {
    document.getElementById("box").value = bound;
    //console.log(document.getElementById("box"));
    return true;
}

// Añade el resultado de la consulta al mapa
function dibujar(res) {
    //console.log(res);
    if (typeof res == "object"){
        console.log("Objeto recibido");
        L.geoJSON(res,{
            style:    
            {
                color: "red"
            }}).addTo(map);
    }
    else if (res.includes("No")){
        L.popup({className: "popupCenter"})
        .setLatLng(map.getCenter())
        .setContent(res)
        .openOn(map);
    }
    else{
        return true;
    }
}

//resultados del sidebar consola
add_info = function(v) {
    var paragraph = document.getElementById("viales_estrechos");
    paragraph.textContent += v;
    }