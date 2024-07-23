import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./src/routes/movieRoutes.js";
import config from './config.json' assert {type: 'json'};
import connectDB from "./mongoDbConnexion.js";
import swaggerUi from "swagger-ui-express";


const app = express();
const portHost = config.HOST;

//Connect MongoDB
connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use('/doc', swaggerUi.serve, swaggerUi.setup('./swagger.json'))

//Routes
app.use(router);

app.post('/', (request, response) => {
    response.send(request.body);
});

app.get('/', (request, response) => {
    response.send('I love movies');
});

//Start serveur
app.listen(portHost, () => {
    console.log(`Server is running on port ${portHost}`);
});