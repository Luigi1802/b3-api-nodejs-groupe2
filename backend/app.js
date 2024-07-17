import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./src/routes/movieRoutes.js";
import config from './config.json' assert {type: 'json'};
import connectDB from "./connectionMongoDb.js";

const app = express();
const portHost = config.HOST;


//Connect MongoDB
connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

//Routes
app.use(router);

app.post('/', (request, response) => {
    response.send(request.body);
});

app.get('/', (request, response) => {
    response.send('movies');
});

//Start serveur
app.listen(portHost, () => {
    console.log(`Server is running on port ${portHost}`);
});