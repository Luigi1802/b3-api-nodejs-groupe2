import Movie from "../models/movieModel.js";
import User from "../models/userModel.js";

const movieAdd = async (request, response, next)=>{
    try {
        const newMovie = new Movie({...request.body});
        const insertedMovie = await newMovie.save();
        return response.status(201).send(insertedMovie);
    }catch (err){
        if (err.name === "ValidationError") {
            return response.status(400).send(err.message);
        }
        return response.status(500).json({message:"Unexpected error, please contact an admnistrator."})
    }
}

const movieUpdate = async (request, response, next)=>{
    const movieId = request.query.id; 
    const movieData = request.body;

    if (!movieId) {
        return response.status(400).json({message:"Movie id is required."});
    }

    try {
        const updatedMovie = await Movie.findByIdAndUpdate(movieId, movieData, {new:true});
        if (!updatedMovie) {
            response.status(404).json({message:`Movie ${movieId} not found.`})
        }
        return response.status(200).send(updatedMovie);
    }catch (err){
        console.log(err.name);
        if (err.name === "CastError") {
            return response.status(400).send(err.message);
        }
        return response.status(500).json({message:"Unexpected error, please contact an admnistrator."})
    }
}

const movieDelete = async (request, response, next)=>{
    const movieId = request.query.id; 

    if (!movieId) {
        return response.status(400).json({message:"Movie id is required."});
    }

    try {
        const deletedMovie = await Movie.findByIdAndDelete(movieId);
        if (!deletedMovie) {
            response.status(404).json({message:`Movie ${movieId} not found.`})
        }
        return response.status(200).send(deletedMovie);
    }catch (err){
        return response.status(500).json({message:"Unexpected error, please contact an admnistrator."})
    }
}

const userGetOne = async (request, response, next)=>{
    const userId = request.query.id;

    if (!userId) {
        return response.status(400).json({message:"User id is required."})
    }

    try {
        const result = await User.find({_id:userId});
        if (result.length > 0) {
            return response.status(200).send(result);
        } else {
            return response.status(204).send(result);
        }
    }catch (err){
        return response.status(500).json({message:"Unexpected error, please contact an admnistrator."})
    }
}

const userGetAll = async (request, response, next)=>{
    try {
        const result = await User.find({});
        if (result.length > 0) {
            return response.status(200).send(result);
        } else {
            return response.status(204).send(result);
        }
    }catch (err){
        return response.status(500).json({message:"Unexpected error, please contact an admnistrator."})
    }
}

export {movieAdd, movieUpdate, movieDelete, userGetOne, userGetAll};