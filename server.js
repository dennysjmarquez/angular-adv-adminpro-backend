'use strict';

const {dbConnection} = require('./database/config');

function init(app) {

  // Conecta con a base de datos
  dbConnection().then(()=>{

    // Inicia el servidor de express
    app.listen(process.env.PORT,()=>{

      console.log(`** Servidor iniciado y corriedo, abra su navegador en: http://localhost:${process.env.PORT}/ **`);

    })

  }).catch(e =>{

    console.error(e);

  });

}

module.exports = {
  init: init
};
