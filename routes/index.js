var express = require('express');
const { check, validationResult } = require('express-validator');

var router = express.Router();
var path = require('path');

//para gestionar el archivo temporal
const fs = require('fs');
const os = require('os');

  // Crear un archivo temporal
  const tmpD = os.tmpdir();

  // VAMOS A USAR EL LOCALSTORAJE Y YA
  const tmpDir = tmpD.slice(0,-19);
  const filePath = path.join(tmpDir, 'respuesta.txt'); 


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
//.bail() después del withMessage si salta errores.
router.get('/c', [check('anchovia').isNumeric().withMessage('Introduce un número').notEmpty().withMessage('El ancho de la via no puede estar vacío!')], async (req, res, next) => {
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

    //console.log(JSON.stringify(geojson));
    console.log(geojson);
    
    //esto para cuando en la consulta no pongo ST_AsGeoJSON(geom)
    //res.render('index', { title: 'Narrow Finder', calles: JSON.stringify(json_respuesta.geom), alam: ancho, caja: bbox, resu:json_respuesta});
    
//    res.render('index', { title: 'Narrow Finder', calles: JSON.stringify(json_respuesta.st_asgeojson), alam: ancho, caja: bbox, resu:JSON.stringify(rows[0].st_asgeojson)});
//console.log(rows[0].st_asgeojson);
// el problema de esto es que SALTA ERROR DE NO ES UN GEOJSON al llamar a funcion en index.
//    res.render('index', { title: 'Narrow Finder', calles: JSON.stringify(json_respuesta.st_asgeojson), alam: ancho, caja: bbox, resu:rows[0].st_asgeojson});
//res.render('index', { title: 'Narrow Finder', calles: JSON.stringify(json_respuesta.st_asgeojson), alam: ancho, caja: bbox, resu:filePath});
//    res.render('index', { title: 'Narrow Finder', calles: JSON.stringify(json_respuesta.st_asgeojson), alam: ancho, caja: bbox, resu:geojson});
    res.render('index', { title: 'Narrow Finder', calles: JSON.stringify(json_respuesta.st_asgeojson), alam: ancho, caja: bbox, resu:JSON.stringify(geojson)});
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
