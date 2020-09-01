require('dotenv').config();

const express = require('express');
const {dbConnection} = require('./database/config');
const cors = require('cors')

// crea el servidor de express
const app = new express();

// Middlewares
app.use(cors()); // <--- Configurar CORS

// Lectura y parseo del Body
app.use(express.json());

// Rutas
app.use('/api/users', require('./routes/users.route'));
app.use('/api/login', require('./routes/auth.route'));

// Conecta con a base de datos
dbConnection().then(()=>{

  // Inicia el servidor de express
  app.listen(process.env.PORT,()=>{

    console.log(`** Servidor corriedo en: http://localhost:${process.env.PORT}/ **`);

  })

}).catch(e =>{

  console.error(e);

});


