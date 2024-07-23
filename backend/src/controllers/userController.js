import User from "../models/userModel.js";

const userPatch = async (request, response, next) => {
    try {
        const userId = request.query.id;
        const userData = request.body;
        const updatedUser = await User.findByIdAndUpdate(userId, userData, {new: true});
        if (!updatedUser) {
            response.status(404).send(`User ${userId} not found.`)
        }
        return response.status(200).send(updatedUser);
    } catch (err) {
        if (err.name === "CastError") {
            return response.status(400).send(err.message);
        }
        return response.status(500).send("Unexpected error, please contact an admnistrator.");
    }
}

const userPostFavorites = async (request, response, next) => {
    try {
        // pass
    } catch (err) {
        return response.status(500).send("Unexpected error, please contact an admnistrator.")
    }
}

const userGetAllFavorites = async (request, response, next) => {
    try {
        const userId = request.query.id;
        const user = await User.findById(userId).select('favorites');
        if (!user) {
            return response.status(404).send(`User ${userId} not found.`);
        }
        return response.status(200).send(user.favorites);
    } catch (err) {
        if (err.name === "CastError") {
            return response.status(400).send(err.message);
        }
        return response.status(500).send("Unexpected error, please contact an administrator.");
    }
}

const userDeleteFavorites = async (request, response, next) => {
    try {
        // pass
    } catch (err) {
        return response.status(500).send("Unexpected error, please contact an admnistrator.")
    }
}

const userPostWatchlist = async (request, response, next) => {
    try {
        // pass
    } catch (err) {
        return response.status(500).send("Unexpected error, please contact an admnistrator.")
    }
}

const userGetAllHistory = async (request, response, next) => {
    try {
        // pass
    } catch (err) {
        return response.status(500).send("Unexpected error, please contact an admnistrator.")
    }
}

const userPatchDeleteAccount = async (request, response, next) => {
    try {
        // pass
    } catch (err) {
        return response.status(500).send("Unexpected error, please contact an admnistrator.")
    }
}


export {
    userPatch,
    userPostFavorites,
    userGetAllFavorites,
    userDeleteFavorites,
    userPostWatchlist,
    userGetAllHistory,
    userPatchDeleteAccount
};