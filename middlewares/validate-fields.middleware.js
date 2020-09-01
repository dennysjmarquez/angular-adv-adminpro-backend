const {response, request} = require('express');
const {validationResult} = require('express-validator');

const validateFields = (req = request, res = response, next) => {

  // Se extraen los errores de los Middlewares
  // de express-validator colocados en el Router.post de este controller
  const errors = validationResult( req );

  if(!errors.isEmpty()){

    return res.status(400).json({
      errors: errors.mapped()
    });

  }

  next();

}

module.exports = {
  validateFields
}
