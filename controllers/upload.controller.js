const { request, response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { upDateImage } = require('../helpers/upDate-image.helper');
const path = require('path');
const fs = require('fs');


const upLoad = async (req = request, res = response) => {

  try {

    const { id, type } = req.params;

    // Valida que se haya mandado un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        msg: 'Error: No se ha mandado ningún archivo'
      });
    }

    // Se procesa la imagen

    const file = req.files.image;
    const nameSplit = file.name.split('.');
    const extFile = nameSplit[nameSplit.length -1].toLowerCase();

    // Extensiones Validas permitidas
    const mimeTypeValid = [
      'image/jpeg',
      'image/png',
      'image/gif'
    ];

    // Verifica que lo que se envié sea del tipo permitido
    if(!mimeTypeValid.includes(file.mimetype)){

      return res.status(400).json({
        msg: 'Error: No es un archivo permitido'
      });

    }

    // Genera el nuevo nombre del archivo
    const nameFile = `${ uuidv4() }.${ extFile }`;

    // Path para guardar el archivo

    const path = `./uploads/${type}/${nameFile}`;

    // Mueve la imagen
    await file.mv(path, (err) =>{

      if (err){

        console.log(err);

        res.status(500).json({
          msg: 'Error inesperado no se pudo subir la imagen… revisar logs'
        });

      }

      // Actualizar base de datos
      upDateImage(type, id, nameFile);


      res.json({
        upLoad: true,
        nameFile
      });

    });

  }catch (e) {

    console.log(e)

    res.status(500).json({
      msg: 'Error inesperado… revisar logs'
    });

  }

}

const returnImg = async (req = request, res = response) => {

  try {

    const {photo, type} = req.params;
    let pathImg = path.join(__dirname, `../uploads/${type}/${photo}`);

    // Si no existe la imagen se manda una por defecto
    if(!fs.existsSync(pathImg)){

      pathImg = path.join(__dirname, `../uploads/assets/no-img.jpg`);

    }

    return res.sendFile(pathImg);

  } catch (e) {

    console.log(e)

    res.status(500).json({
      msg: 'Error inesperado… revisar logs'
    });

  }

}

module.exports = {

  upLoad,
  returnImg

};
