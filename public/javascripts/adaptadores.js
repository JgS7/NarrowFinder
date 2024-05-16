function adaptRES(ree) {
    var i = 0;
    //Solo sustituye el primer que coincide, el segundo no.
    var geojsoN = ree.toString().replace(/&#34;/g, function(match) {
          i++;
          // sustituye los impares por un espacio. si es true devuelve match, que es lo que encuentra, si es falso lo cambia
          return '"';
      });
      //console.log(geojsoN);
    return geojsoN;
  } 

  function adaptRES2(ree) {
      var i = 0;
      //Solo sustituye el primer que coincide, el segundo no.
      var geoj = ree.toString().replace(/":"{/g, function(match) {
              i++;
              return '":{';
          });
      var geojsoN = geoj.toString().replace(/}"}/g, function(match) {
              i++;
              //PONGO ESTO PORQUE ME ELIMINA TAMBIEN EL CORCHETE
              return '}}';
          });
          //console.log(geojsoN);
      return geojsoN;
      }