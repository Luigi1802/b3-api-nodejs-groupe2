import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'My API',
        description: 'Description',

    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
    tags:[
        {name:"Publique", description: ""},
        {name:"Admin" ,description: ""},
        {name:"User" , description: ""},],
    host: 'localhost:5001'
};



const outputFile = './swagger.json';
const routes = ['./src/routes/*.js'];


swaggerAutogen({openapi: '3.1.0'})(outputFile, routes, doc);