var express = require('express');
var router = express.Router();
var path = require('path');

//CONEXION A BASE DE DATOS ((((REVISAR, SI ESTO ESTA LA PAGINA WEB NO FUNCIONA))))
require('dotenv').config({
    override: true,
    path: path.join(__dirname, 'database.env')
});

const {Pool} = require('pg');
//FALLA ESTO, CAMBIARLO DE LADO
const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT
    });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Narrow Finder' });
});

router.get('/c', async (req, res, next) => {
  try {
    const {rows} = await pool.query('SELECT current_user');
    const currentUser = rows[0]['current_user']
    res.send(currentUser);
    console.log(currentUser);
// Este redirect no lo hace, por lo menos en esta posiscion
    res.redirect('/');
  }
  catch (err) {
    console.error(err);
  } finally {
    //client.release();
    //await pool.end();
    pool.end();
  }
});

module.exports = router;
