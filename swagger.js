// basic usage
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API Children Books',
    description: 'books',
  },
  // match port from render this time including https
  // host: 'childrens-books.onrender.com',
  host: 'childrens-books.onrender.com',
  schemes: ['https'],
  securityDefinitions: {
    oAuthSample: {
      type: 'oauth2',
      authorizationUrl: 'https://childrens-books.onrender.com/api-docs',
      flow: 'implicit',
      scopes: {
        write_books: ''
      }
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);