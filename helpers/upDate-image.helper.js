const fs = require('fs');

const UsersModel = require('../models/usuario.model');
const HospitalsModel = require('../models/hospital.model');
const MedicosModel = require('../models/medico.model');



const deleteImg = (path) => {

  if(fs.existsSync(path)){

    try {
      fs.unlinkSync(path);
    } catch (e) {
      return false;
    }

  }

}

const upDateImage =  async (type, id, nameFile) =>{

  switch (type) {

    case  'hospitals': {

      const hospital = await HospitalsModel.findById(id);

      if(!hospital){

        console.log('El id del hospital no existe');

        return false;

      }

      if(hospital.img){

        const oldPath = `./uploads/${type}/${hospital.img}`;

        // Borrar la imagen anterior
        deleteImg(oldPath);

      }


      hospital.img = nameFile;

      try {

        await hospital.save();

        return true;

      } catch (e) {
        return false;
      }

    }

    case 'medicos': {

      const medico = await MedicosModel.findById(id);

      if(!medico){

        console.log('El id del medico no existe');

        return false;

      }

      if(medico.img){

        const oldPath = `./uploads/${type}/${medico.img}`;

        // Borrar la imagen anterior
        deleteImg(oldPath);

      }


      medico.img = nameFile;

      try {

        await medico.save();

        return true;

      } catch (e) {
        return false;
      }

    }

    case 'users': {

      const user = await UsersModel.findById(id);

      if(!user){

        console.log('El id del hospital no existe');

        return false;

      }

      if(user.img){

        const oldPath = `./uploads/${type}/${user.img}`;

        // Borrar la imagen anterior
        deleteImg(oldPath);

      }


      user.img = nameFile;

      try {

        await user.save();

        return true;

      } catch (e) {
        return false;
      }

    }


  }


}



module.exports = {
  upDateImage
}
