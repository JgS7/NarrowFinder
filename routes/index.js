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
    return piscina
  }
  
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Narrow Finder', calles: '' , alam: ''});
});


// Para hacer la consulta a la bd:
router.get('/c', async (req, res, next) => {
  var ancho = req.body.anchoVia;
  //var ancho = document.getElementById("anchoVia").value;
  //console.log(document.getElementById("anchoVia").value);

  try {
    pool = connect();
    const {rows} = await pool.query('SELECT current_user');
    //Los $1 y $2 son sustituidos por ancho y bbox
    //const {rows} = await pool.query('SELECT * FROM nombre_tabla
    //WHERE ST_Intersects($2,geometria de la tabla) AND (columna_ancho de la tabla<=$1) ',[ancho,bbox]);
    const currentUser = rows[0]['current_user']
    res.render('index', { title: 'Narrow Finder', calles:  currentUser, alam: ancho});
    
    //res.send(currentUser);
    console.log(currentUser);
  }
  catch (err) {
    console.error(err);
  } finally {
    //client.release();
    await pool.end();
  }
});

module.exports = router;
