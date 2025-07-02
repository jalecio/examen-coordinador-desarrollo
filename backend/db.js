//cliente para conexión a postgres
const { Pool } = require('pg');
//obtenemso la configuración para la conexión
require('dotenv').config();

//creamos la conexión a la BD
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

//exportamos los modulos
module.exports = {
  query: (text, params) => pool.query(text, params),
};