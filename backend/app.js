const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const movie = require('./src/routes/movieRoute');
const config = require('./config.json');
const connectDB = require('./connectionMongoDb');

const app = express();
const portHost = config.HOST;
const API_URL = config.API;

// Connect to MongoDB
connectDB();

// Middlewaresnpms
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use(movie);

app.post('/', (request, response) => {
    response.send(request.body);
});

app.get('/', (request, response) => {
    response.send('medical');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});