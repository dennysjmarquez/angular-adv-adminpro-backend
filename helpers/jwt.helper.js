const jwt = require('jsonwebtoken');



const generateJWT = (uid) => new Promise((resolve, reject) => {

  const payload = {
    uid
  }

  jwt.sign(payload, process.env.JWT_SECRET, {

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
