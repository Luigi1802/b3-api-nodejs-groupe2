import Movie from "../models/movieModel.js";

const movieGetOne = async (request, response, next)=>{
    const movieId = request.query.id;

    if (!movieId) {
        return response.status(400).json({message:"Movie id is required."})
    }

    try {
        const result = await Movie.find({_id:movieId});
        if (result.length > 0) {
            return response.status(200).send(result);
        } else {
            return response.status(204).send(result);
        }
    }catch (err){
        return response.status(500).json({message:"Unexpected error, please contact an admnistrator."})
    }
}

const movieGetAll = async (request, response, next)=>{
    try {
        const result = await Movie.find({});
        if (result.length > 0) {
            return response.status(200).send(result);
        } else {
            return response.status(204).send(result);
        }
    }catch (err){
        return response.status(500).json({message:"Unexpected error, please contact an admnistrator."})
    }
}

const movieSearch = async (request, response, next)=>{
    const {title, year, genre} = request.query;

    if (!title && !year && !genre) {
        return response.status(400).json({message:"At least one query parameter (between title, year, or genre) is required."});
    }

    try {
        let searchObject = {};
        if (title) {searchObject.title = {$regex: new RegExp(title), $options: 'i'}}
        if (year) {searchObject.year = year;}
        if (genre) {searchObject.genres = genre;}
        
        const result = await Movie.find(searchObject);
        if (result.length > 0) {
            return response.status(200).send(result);
        } else {
            return response.status(204).send(result);
        }
    }catch (err){
        return response.status(500).json({message:"Unexpected error, please contact an admnistrator."})
    }
}

export {movieGetOne, movieGetAll, movieSearch};