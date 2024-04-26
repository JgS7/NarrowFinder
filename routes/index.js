var express = require('express');
var router = express.Router();
var path = require('path');

console.log('Current directory: ' + process.cwd()); //CHEQUEAR DIR

//CONEXION A BASE DE DATOS ((((REVISAR, SI ESTO ESTA LA PAGINA WEB NO FUNCIONA))))
require('dotenv').config({
    override: true,
    path: path.join(__dirname, 'database.env')
});

const {Pool} = require('pg');
function connect(){
  //FALLA ESTO, CAMBIARLO DE LADO
  const piscina = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT
    });
    return piscina;
  }
  
  // Adaptación del bbox para realizar la consulta SQL
function adaptBBOX(bbox) {
  var i = 0;
  var box = bbox.toString().replace(/,/g, function(match) {
        i++;
        // sustituye los impares por un espacio. si es true devuelve match, que es lo que encuentra, si es falso lo cambia
        return i % 2 == 0 ? match : ' ';
    });
  return box;
}  

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Narrow Finder', calles: '' , alam: '', caja: '', resu: ''});
  res.render('index', { title: 'Narrow Finder', calles: '' , alam: '', caja: '', resu:''});
});


// Para hacer la consulta a la bd:
router.get('/c', async (req, res, next) => {
  var ancho = req.query.anchoVia;
  var bbox = req.query.bbox;

  // Llamada a función adaptar bbox
  var box = adaptBBOX(bbox);
  console.log(box);
 
  try {
    pool = connect();

    //Los $1 y $2 son sustituidos por ancho y bbox´
    
    //const {rows} = await pool.query('SELECT * FROM public.prueba2 ORDER BY id ASC LIMIT 2;');


//    consulta = 'SELECT * FROM public.mad WHERE ST_Intersects(ST_GeomFromEWKT('
//    consulta = 'SELECT geom::json FROM public.mad WHERE ST_Intersects(ST_GeomFromEWKT('
    //consulta = 'SELECT ST_AsGeoJSON(geom) FROM public.mad WHERE ST_Intersects(ST_GeomFromEWKT('
    //consulta2 = consulta+"'SRID=4326;POLYGON(("+box+"))'),mad.geom);" 

consulta = "SELECT ST_AsGeoJSON(geom) FROM public.mad WHERE ST_Intersects(ST_GeomFromEWKT('SRID=4326;POLYGON(("+box+"))'),mad.geom);";
//    console.log(consulta2);
  console.log(consulta);  

/** 
    var tab0 = "SELECT row_to_json(fc) FROM (" 
    var tab1 = "SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM ("
    //var tab2 = "SELECT 'Feature' As type,"+(consulta)+"::json As geometry FROM mad) As f )  As fc;"
    var tab2 = "SELECT 'Feature' As type, mad.geom::json As geometry FROM mad) As f )  As fc;"
    var cos = tab0+tab1+tab2;
*/

/**Consulta  completa para coger atributos 
    SELECT row_to_json(fc)
    FROM ( 
      SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
      FROM (
        SELECT 'Feature' As type, 
        ST_AsGeoJSON(lg.geom)::json As geometry, 
        (select row_to_json(t) 
        from (select FIELD_1, FIELD_2, FIELD_N) t
        )
        As properties
        FROM MY_TABLE_OR_VIEW As lg   ) As f )  As fc;
*/

    //const {rows} = await pool.query(consulta2);
    const {rows} = await pool.query(consulta);
    //const {rows} = await pool.query(cos);

    //const {rows} = await pool.query('SELECT * FROM public.mad WHERE ST_Intersects($1,geom);', [bbox]);
    //WHERE ST_Intersects($2,geom) AND (columna_ancho de la tabla<=$1) ',[ancho,bbox]);
    
    //console.log(rows);
    //console.log(rows[0].st_asgeojson);
    json_respuesta = rows[0];
    //el validador de mapbox
    geojson = {"type": "FeatureCollection","features":[{"type": "Feature","properties": {"name": "Dinagat Islands"},"geometry":rows[0].st_asgeojson}]};

    //SIGUE DANDO ERROR AUNQUE SEA VERIFICADO POR MAPBOX
var lol = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "Dinagat Islands"
      },
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [
          [
            [
              [
                -3.721150157,
                40.415608556
              ],
              [
                -3.721150215,
                40.415613961
              ],
              [
                -3.721101912,
                40.415616064
              ],
              [
                -3.721100339,
                40.415579137
              ],
              [
                -3.721118018,
                40.415579027
              ],
              [
                -3.721113597,
                40.415496171
              ],
              [
                -3.721095918,
                40.415496281
              ],
              [
                -3.721094365,
                40.415461156
              ],
              [
                -3.721143856,
                40.415459946
              ],
              [
                -3.721143914,
                40.415465351
              ],
              [
                -3.721195762,
                40.415464127
              ],
              [
                -3.721195464,
                40.415436201
              ],
              [
                -3.7213086,
                40.415434594
              ],
              [
                -3.721308888,
                40.415461619
              ],
              [
                -3.721313602,
                40.41546159
              ],
              [
                -3.721320693,
                40.415463348
              ],
              [
                -3.721326615,
                40.415466013
              ],
              [
                -3.721331368,
                40.415469587
              ],
              [
                -3.721337299,
                40.415473154
              ],
              [
                -3.721340883,
                40.415477636
              ],
              [
                -3.721344467,
                40.415482118
              ],
              [
                -3.721346882,
                40.415487509
              ],
              [
                -3.721397562,
                40.415487192
              ],
              [
                -3.721400871,
                40.415576361
              ],
              [
                -3.721349023,
                40.415577586
              ],
              [
                -3.721347892,
                40.415582097
              ],
              [
                -3.721345583,
                40.415586616
              ],
              [
                -3.721343274,
                40.415591135
              ],
              [
                -3.721339777,
                40.415594761
              ],
              [
                -3.721335101,
                40.415598393
              ],
              [
                -3.721330415,
                40.415601125
              ],
              [
                -3.721324542,
                40.415602964
              ],
              [
                -3.721318668,
                40.415604802
              ],
              [
                -3.721316311,
                40.415604817
              ],
              [
                -3.72131659,
                40.415630941
              ],
              [
                -3.721199957,
                40.415636173
              ],
              [
                -3.721199659,
                40.415608247
              ],
              [
                -3.721150157,
                40.415608556
              ]
            ]
          ]
        ]
      }
    }
  ]
};
//geojson = lol;
    console.log(JSON.stringify(geojson));
//    console.log(geojson);
    
    //esto para cuando en la consulta no pongo ST_AsGeoJSON(geom)
    //res.render('index', { title: 'Narrow Finder', calles: JSON.stringify(json_respuesta.geom), alam: ancho, caja: bbox, resu:json_respuesta});
    
//    res.render('index', { title: 'Narrow Finder', calles: JSON.stringify(json_respuesta.st_asgeojson), alam: ancho, caja: bbox, resu:JSON.stringify(rows[0].st_asgeojson)});

// el problema de esto es que SALTA ERROR DE NO ES UN GEOJSON al llamar a funcion en index.
//    res.render('index', { title: 'Narrow Finder', calles: JSON.stringify(json_respuesta.st_asgeojson), alam: ancho, caja: bbox, resu:rows[0].st_asgeojson});
    res.render('index', { title: 'Narrow Finder', calles: JSON.stringify(json_respuesta.st_asgeojson), alam: ancho, caja: bbox, resu:geojson});
//    res.render('index', { title: 'Narrow Finder', calles: JSON.stringify(json_respuesta.st_asgeojson), alam: ancho, caja: bbox, resu:JSON.stringify(geojson)});
        //res.render('index', { title: 'Narrow Finder', calles: JSON.stringify(json_respuesta), alam: ancho, caja: bbox, resu:dibujar(rows[0].row_to_json)});
    
    //res.send(currentUser);
    //console.log(currentUser);
  }
  catch (err) {
    console.error(err);
  } finally {
    //client.release();
    await pool.end();
  }
});

module.exports = router;
