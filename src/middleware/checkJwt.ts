
import jwt from "express-jwt";
import jwksRsa from "jwks-rsa";

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `http://image-tagger.auth0.com/.well-known/jwks.json`
    }),
  
    // Validate the audience and the issuer.
    audience: 'https://image-tagger-api',
    issuer: `https://image-tagger.auth0.com`,
    algorithms: ['RS256']
  });

  export default checkJwt;