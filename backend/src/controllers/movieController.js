import Movie from "../models/movieModel.js";


const movieGetOne = async (request, response, next)=>{
    try {
        const title = request.query.title;
        const result = await Movie.findOne({title:title});
console.log("getmovie")
    }catch (err){
        return response.status(500).send("Erreur serveur")
    }
}

export default movieGetOne;