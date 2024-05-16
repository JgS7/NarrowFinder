
function mostrar() {
    document.getElementById("sidebar").style.width = "260px";
    document.getElementById("map").style.marginLeft = "260px";
}

function ocultar() {
    document.getElementById("sidebar").style.width = "0";
    document.getElementById("map").style.marginLeft = "0";
}
// SOLUCIONADO, PERO AHORA TENGO QUE VER COMO HACER PARA QUE NO ME SOBREESCRIBA, ademas buscar posgresql y geojson
function validar(bound) {
    document.getElementById("box").value = bound;
    //console.log(document.getElementById("box"));
    return true;
}

function dibujar(res) {

    console.log(res);
    //devuelve objetc cuando le meto object en index
    //console.log(JSON.stringify(res));
    L.geoJSON(res,{
        style:    
        {
            color: "red"
        }}).addTo(map);
        //console.log(L.geoJSON(res).addTo(map));
        return true;
    }