import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'API Films',
        description: '',

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
        {name:"Publique", description: "Routes accessibles sans token d'authentification"},
        {name:"Admin", description: "Routes accessibles avec un token Administrateur"},
        {name:"User", description: "Routes accessibles avec un token Utilisateur (ou Administrateur)"},],
    host: 'localhost:5001'
};



const outputFile = './swagger.json';
const routes = ['./src/routes/*.js'];


swaggerAutogen({openapi: '3.1.0'})(outputFile, routes, doc);