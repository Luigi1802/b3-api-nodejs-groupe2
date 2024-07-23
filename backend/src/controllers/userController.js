import User from "../models/userModel.js";

const userPatch = async (request, response, next) => {
    /*let user: any;

    const _id = request.body._id;

    await User.findOne({_id: _id}).then((results) => {
        if (results) {
            user = results;
        } else {
            return response.status(404).json("Aucun utilisateur trouvé avec l'id envoyé.")
        }
    }).catch((err) => {
        return response.status(400).send(err.message);
    });

    if (user) {
        user.email = request.body.email;
        user.password = request.body.password;
        user.name = request.body.name;
        user.surname = request.body.surname;
    } else {
        return response.status(500).send("Unexpected error, please contact an admnistrator.");
    }

    try {
        await user.save()
        return response.status(201).json({message: "Utilisateur mis à jour avec succès."});
    } catch (err){
        return response.status(500).send("Unexpected error, please contact an admnistrator.");
    }*/
}

const userPostFavorites = async (request, response, next) => {
    try {
        // pass
    } catch (err){
        return response.status(500).send("Unexpected error, please contact an admnistrator.")
    }
}

const userGetAllFavorites = async (request, response, next) => {
    try {
        // pass
    } catch (err){
        return response.status(500).send("Unexpected error, please contact an admnistrator.")
    }
}

const userDeleteFavorites = async (request, response, next) => {
    try {
        // pass
    } catch (err){
        return response.status(500).send("Unexpected error, please contact an admnistrator.")
    }
}

const userPostWatchlist = async (request, response, next) => {
    try {
        // pass
    } catch (err){
        return response.status(500).send("Unexpected error, please contact an admnistrator.")
    }
}

const userGetAllHistory = async (request, response, next) => {
    try {
        // pass
    } catch (err){
        return response.status(500).send("Unexpected error, please contact an admnistrator.")
    }
}

const userPatchDeleteAccount = async (request, response, next) => {
    try {
        // pass
    } catch (err){
        return response.status(500).send("Unexpected error, please contact an admnistrator.")
    }
}


export {userPatch, userPostFavorites, userGetAllFavorites, userDeleteFavorites, userPostWatchlist, userGetAllHistory, userPatchDeleteAccount};