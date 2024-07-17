import Movie from "../models/movieModel.js";

const movieGetOne = async (request, response, next)=>{
    try {
        const title = request.query.title;
        const result = await Movie.find({title:title});
        return response.status(200).send(result);
    }catch (err){
        return response.status(500).send("Erreur serveur")
    }
}

const movieGetAll = async (request, response, next)=>{
    try {
        const result = await Movie.find({});
        return response.status(200).send(result);
    }catch (err){
        return response.status(500).send("Erreur serveur")
    }
}

export {movieGetOne, movieGetAll};