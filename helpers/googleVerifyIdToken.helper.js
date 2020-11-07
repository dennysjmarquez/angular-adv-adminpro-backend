const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_ID);

const googleVerifyIdToken = async (token) => {

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_ID,  // Specify the CLIENT_ID of the app that accesses the backend
  });

  return { email, name, picture } = ticket.getPayload();

}


module.exports = {
  googleVerifyIdToken
}
