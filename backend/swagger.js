import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'My API',
        description: 'Description'
    },
    host: 'localhost:3000'
};

const outputFile = './swagger.json';
const routes = ['./src/routes/movieRoutes.js'];


swaggerAutogen({openapi: '3.1.0'})(outputFile, routes, doc);