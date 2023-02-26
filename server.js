const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');

require('dotenv').config();

const port = process.env.PORT || 8080;
const app = express();

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
    // // res.setHeader('Content-Type', 'application/json');
    // res.setHeader('Content-Type: text/html');
    // res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    next();
  })
  .use('/', require('./routes'));

// express setup
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)) // express setup


// handling errors - catch all errors
process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

//Auth
const { auth, requiresAuth } = require('express-openid-connect');
app.use(
  auth({
    authRequired: false,
    auth0Logout:true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
    //idpLogout: true,
  })
);

app.get('/',(req,res)=>{
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
});

// profile route, middleware (requires user to login), callback
app.get('/profile', requiresAuth(), (req, res) =>{
  res.send(JSON.stringify(req.oidc.user));
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});