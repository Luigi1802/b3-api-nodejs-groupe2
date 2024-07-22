import Movie from "../models/movieModel.js";

const movieGetOne = async (request, response, next)=>{
    try {
        const title = request.query.title;
        const result = await Movie.find({title:title});
        if (result.length > 0) {
            return response.status(200).send(result);
        } else {
            return response.status(204).send(result);
        }
    }catch (err){
        return response.status(500).send("Erreur serveur")
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
        return response.status(500).send("Erreur serveur")
    }
}

export {movieGetOne, movieGetAll};