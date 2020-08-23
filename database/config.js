const mongoose = require('mongoose');

const dbConnection = async () => {

  try {

    await mongoose.connect(process.env.DB_CNN,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      })

  }catch (e) {

    throw new Error(e)

  }

}

module.exports = {
  dbConnection
};
