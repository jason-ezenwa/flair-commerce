import { expressjwt } from 'express-jwt';

function authJwt() {
  // returns a middleware to verify JWTs.
  const envSecret = process.env.SECRET_KEY;
  return expressjwt({
    secret: envSecret,
    algorithms: ['HS256'],
    isRevoked,
    // to revoke regular customers from having access to endpoints
    // that can creat or delete products and users.
  }).unless({
    path: [
      // specify endpoints that are not protected
      '/api/v1/login',
      '/api/v1/register_user',
      // specify what actions can be performed freely with the /products endpoint protected.
      { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
      { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },,
      { url: /\/public\/flair-commerce-uploads(.*)/, methods: ['GET', 'OPTIONS'] },
    ],
  });
  // unless is used to state which endpoints are not protected.
}

async function isRevoked(request, token) {
  // customers who have isAdmin as false, will be revoked
  // and restricted to allowed paths in the unless call.
  if (token.payload.isAdmin === false) {
    return true; // revoke token
  }
  return false;
}

export default authJwt;
