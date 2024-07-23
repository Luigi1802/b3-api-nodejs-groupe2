// Import du model Movie
import Movie from "../models/movieModel.js";

// Récupération d'un film par son id
const movieGetOne = async (request, response, next)=>{
    const movieId = request.query.id;

    // Vérification qu'un id est passé dans la requête
    if (!movieId) {
        return response.status(400).json({message:"Movie id is required."})
    }

    try {
        const result = await Movie.find({_id:movieId});
        if (result.length > 0) {
            return response.status(200).send(result);
        } else {
            // Si aucun film n'est trouvé, erreur 404
            return response.status(404).send(result);
        }
    }catch (err){
        if (err.name === 'CastError') {
            // Si l'id entré est incorrect, erreur 400
            return response.status(400).json({ message: 'Invalid Movie id format.' });
        }
        return response.status(500).json({message:"Unexpected error, please contact an admnistrator."})
    }
}

// Récupération de tous les films en BDD
const movieGetAll = async (request, response, next)=>{
    // Récupération des paramètres de pagination
    const page = parseInt(request.query.page) || 1;
    const limit = parseInt(request.query.limit) || 10;

    // Calcul de l'offset
    const skip = (page - 1) * limit;
    
    try {
        // Récupération des films de la page demandée
        const result = await Movie.find({}).skip(skip).limit(limit);

        // Récupération du nombre total de films en BDD
        const totalMovies = await Movie.countDocuments();
        
        if (result.length > 0) {
            // Envoi des films avec des informations sur les données paginées
            return response.status(200).json({
                page: page,
                nbMovies: limit,
                totalPages: Math.ceil(totalMovies / limit),
                totalMovies: totalMovies,
                movies: result
            });
        } else {
            // Si aucun film n'est présent, erreur 204
            return response.status(204).send(result);
        }
    }catch (err){
        return response.status(500).json({message:"Unexpected error, please contact an admnistrator."})
    }
}

// Recherche d'un film à partir d'un titre, d'une année de sortie et/ou d'un genre
const movieSearch = async (request, response, next)=>{
    const {title, year, genre} = request.query;

    // Si aucun des paramètres de recherche n'est donné, erreur 400
    if (!title && !year && !genre) {
        return response.status(400).json({message:"At least one query parameter (between title, year, or genre) is required."});
    }

    try {
        // Formation d'une query mongoDB en fonction des paramètres de recherche fournis ou non
        let searchObject = {};
        if (title) {searchObject.title = {$regex: new RegExp(title), $options: 'i'}}
        if (year) {searchObject.year = year;}
        if (genre) {searchObject.genres = genre;}

        // Récupération du résultat de la recherche
        const result = await Movie.find(searchObject);

        if (result.length > 0) {
            return response.status(200).send(result);
        } else {
            // Si la liste des résultats est vide, erreur 204
            return response.status(204).send(result);
        }
    }catch (err){
        return response.status(500).json({message:"Unexpected error, please contact an admnistrator."})
    }
}

export {movieGetOne, movieGetAll, movieSearch};