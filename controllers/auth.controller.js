const { request, response } = require('express');
const bcrypt = require('bcryptjs');

const UsersModel = require('../models/usuario.model');
const { generateJWT } = require('../helpers/jwt.helper');



const login = async (req = request, res = response) => {


  const { email, password } = req.body;


  try {

    // Verifica el Email
    const userDb = await UsersModel.findOne({ email });
    if(!userDb){

      return res.status(404).json({
        msg: 'No se ha podido encontrar tu cuenta'
      });

    }

    // Verifica el Password
    const validPass = bcrypt.compareSync(password, userDb.password);

    if(!validPass){

      return res.status(400).json({
        msg: 'Contraseña incorrecta'
      });

    }

    // Genera un Token - JWT
    const token = await generateJWT(userDb.id);

    res.json({
      token
    });

  }catch (e) {

    console.log(e);

    res.status(500).json({
      msg: 'Error inesperado… revisar logs'
    });

  }


}



module.exports = {
  login
}
