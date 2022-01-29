const jwt = require('jsonwebtoken');



const generateJWT = (data) => new Promise((resolve, reject) => {
  const payLoad = { payLoad: data }

  jwt.sign(payLoad, process.env.JWT_SECRET, {

    expiresIn: '24h'

  }, (err, token) => {

    if (err) {
      console.log(err);
      reject(err)
    } else {
      resolve(token);
    }

  });

});



module.exports = {
  generateJWT
}
