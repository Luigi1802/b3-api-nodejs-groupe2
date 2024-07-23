// Import des models Movie et User
import Movie from "../models/movieModel.js";
import User from "../models/userModel.js";

// Ajout d'un film à la BDD
const movieAdd = async (request, response, next)=>{
    try {
        // Création et insertion d'un Movie à partie des données du body
        const newMovie = new Movie({...request.body});
        const insertedMovie = await newMovie.save();
        return response.status(201).send(insertedMovie);
    }catch (err){
        if (err.name === "ValidationError") {
            // Si les données du film entrées dans le body sont incorrectes, erreur 400
            return response.status(400).send(err.message);
        }
        return response.status(500).json({message:"Unexpected error, please contact an admnistrator."})
    }
}

// Mise a jour d'un film en BDD
const movieUpdate = async (request, response, next)=>{
    const movieId = request.query.id; 
    const movieData = request.body;

    // Vérification qu'un id est passé dans la requête
    if (!movieId) {
        return response.status(400).json({message:"Movie id is required."});
    }

    try {
        // Ciblage du film à partir de l'id et mise a jour avec les données du body
        const updatedMovie = await Movie.findByIdAndUpdate(movieId, movieData, {new:true});
        if (!updatedMovie) {
            // Si le film n'est pas déjà présent en BDD, erreur 404
            response.status(404).json({message:`Movie ${movieId} not found.`})
        }
        return response.status(200).send(updatedMovie);
    }catch (err){
        console.log(err.name);
        if (err.name === "CastError") {
            // Si les données du film entrées dans le body sont incorrectes, erreur 400
            return response.status(400).send(err.message);
        }
        return response.status(500).json({message:"Unexpected error, please contact an admnistrator."})
    }
}

// Suppression d'un film en BDD
const movieDelete = async (request, response, next)=>{
    const movieId = request.query.id; 

    // Vérification qu'un id est passé dans la requête
    if (!movieId) {
        return response.status(400).json({message:"Movie id is required."});
    }

    try {
        // Suppression du film correspondant à l'id
        const deletedMovie = await Movie.findByIdAndDelete(movieId);
        if (!deletedMovie) {
            // Si le film n'est pas déjà présent en BDD, erreur 404
            response.status(404).json({message:`Movie ${movieId} not found.`})
        }
        return response.status(200).send(deletedMovie);
    }catch (err){
        if (err.name === 'CastError') {
            // Si l'id entré est incorrect, erreur 400
            return response.status(400).json({ message: 'Invalid Movie id format.' });
        }
        return response.status(500).json({message:"Unexpected error, please contact an admnistrator."})
    }
}

// Récupération d'un utilisateur par son id
const userGetOne = async (request, response, next)=>{
    const userId = request.query.id;

    // Vérification qu'un id est passé dans la requête
    if (!userId) {
        return response.status(400).json({message:"User id is required."})
    }

    try {
        const result = await User.find({_id:userId});
        if (result.length > 0) {
            return response.status(200).send(result);
        } else {
            // Si aucun utilisateur n'est trouvé, erreur 404
            return response.status(404).send(result);
        }
    }catch (err){
        if (err.name === 'CastError') {
            // Si l'id entré est incorrect, erreur 400
            return response.status(400).json({ message: 'Invalid User id format.' });
        }
        return response.status(500).json({message:"Unexpected error, please contact an admnistrator."})
    }
}

// Récupération de tous les utilisateurs en BDD
const userGetAll = async (request, response, next)=>{
    try {
        const result = await User.find({});
        if (result.length > 0) {
            return response.status(200).send(result);
        } else {
            // Si aucun utilisateur n'est présent, erreur 204
            return response.status(204).send(result);
        }
    }catch (err){
        return response.status(500).json({message:"Unexpected error, please contact an admnistrator."})
    }
}

export {movieAdd, movieUpdate, movieDelete, userGetOne, userGetAll};