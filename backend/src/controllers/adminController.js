import Movie from "../models/movieModel.js";

const movieAdd = async (request, response, next)=>{
    try {
        const newMovie = new Movie({...request.body});
        const insertedMovie = await newMovie.save();
        return response.status(201).send(insertedMovie);
    }catch (err){
        if (err.name === "ValidationError") {
            return response.status(400).send(err.message);
        }
        return response.status(500).send("Unexpected error, please contact an admnistrator.");
    }
}

export {movieAdd};