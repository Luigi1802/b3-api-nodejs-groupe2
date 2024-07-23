import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import movieRouter from "./src/routes/movieRoutes.js";
import adminRouter from "./src/routes/adminRoutes.js";
import userRouter from "./src/routes/userRoutes.js";
import config from './config.json' assert {type: 'json'};
import connectDB from "./mongoDbConnexion.js";
import swaggerUi from "swagger-ui-express";



const app = express();
const portHost = config.HOST;

// Connexion MongoDB
connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use('/swagger', swaggerUi.serve, swaggerUi.setup("./swagger.json"))

// Routes publiques
app.use(movieRouter);

// Routes privées
app.use(adminRouter);
app.use(userRouter);

// Route racine
app.get('/', (request, response) => {
    response.send('I love movies');
});

// Démarrage du serveur
app.listen(portHost, () => {
    console.log(`Server is running on port ${portHost}`);
});