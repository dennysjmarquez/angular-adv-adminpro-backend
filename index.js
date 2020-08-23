require('dotenv').config();

const express = require('express');
const {dbConnection} = require('./database/config');
const cors = require('cors')

// crea el servidor de express
const app = new express();

// Middlewares
app.use(cors()); // <--- Configurar CORS

// Rutas
app.get('/', (req, res) => {

  res.json({'msg': 'Hola Mundo'});

});

// Conecta con a base de datos
dbConnection().then(()=>{

  // Inicia el servidor de express
  app.listen(process.env.PORT,()=>{

    console.log(`Servidor Express iniciado en el Puerto: ${process.env.PORT}`);

  })

}).catch(e =>{

  console.error(e);

});


