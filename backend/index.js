import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import movieRouter from "./src/routes/movieRoutes.js";
import adminRouter from "./src/routes/adminRoutes.js";
import userRouter from "./src/routes/userRoutes.js";
import config from './config.json' assert {type: 'json'};
import connectDB from "./mongoDbConnexion.js";

const app = express();
const portHost = config.HOST;

//Connect MongoDB
connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

//Routes
app.use(movieRouter);
app.use(adminRouter);
app.use(userRouter);

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