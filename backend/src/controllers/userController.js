import User from "../models/userModel.js";
import Movie from "../models/movieModel.js";

// Modification des données de l'utilisateur
const userPatch = async (request, response, next) => {
    try {
        const userId = request.query.id;

        if (!userId) {
            return response.status(400).json({ message: "User id is required." });
        }

        const userData = request.body;

        const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true });
        if (!updatedUser) {
            response.status(404).json({ message: `User ${userId} not found.` });
        }
        return response.status(200).send(updatedUser);
    } catch (err) {
        if (err.name === "CastError") {
            return response.status(400).send(err.message);
        }
        return response.status(500).json({ message: "Unexpected error, please contact an admnistrator." });
    }
}

const userPostFavorites = async (request, response, next) => {
    try {
        const userId = request.query.id;
        const movieId = request.body.id;

        if (!userId) {
            return response.status(400).json({ message: 'User id is required.' });
        }

        const movie = await Movie.findById(movieId);
        /*if (!movie) {
            return response.status(404).json({ message: `Movie ${movieId} not found.` });
        }*/

        const user = await User.findById(userId);
        if (!user) {
            return response.status(404).json({ message: `User ${userId} not found.` });
        }

        if (user.favorites.includes(movieId)) {
            return response.status(400).json({ message: 'Movie is already in the favorites list.' });
        }

        user.favorites.push(movieId);
        await user.save();

        return response.status(200).json(user.favorites);
    } catch (err) {
        if (err.name === 'CastError') {
            return response.status(400).json({ message: 'Invalid user id or movie id format.' });
        }
        return response.status(500).json({ message: 'Unexpected error, please contact an administrator.' });
    }
}

// Récupération des favoris de l'utilisateur
const userGetAllFavorites = async (request, response, next) => {
    try {
        const userId = request.query.id;
        const user = await User.findById(userId).select('favorites');
        if (!user) {
            return response.status(404).json({ message: `User ${userId} not found.` });
        }
        return response.status(200).send(user.favorites);
    } catch (err) {
        if (err.name === "CastError") {
            return response.status(400).send(err.message);
        }
        return response.status(500).json({ message: "Unexpected error, please contact an administrator." });
    }
}

// Supprimer un film de la liste de favoris d'un utilisateur
const userDeleteFavorites = async (request, response, next) => {
    const userId = request.query.id;
    const movieId = request.body.id;

    if (!userId) {
        return response.status(400).json({ message: 'User id is required.' });
    }

    const movie = await Movie.findById(movieId);
    if (!movie) {
        return response.status(404).json({ message: `Movie ${movieId} not found.` });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return response.status(404).json({ message: `User ${userId} not found.` });
        }

        const favoriteIndex = user.favorites.indexOf(movieId);
        if (favoriteIndex === -1) {
            return response.status(404).json({ message: 'Movie not found in favorites list.' });
        }

        user.favorites.splice(favoriteIndex, 1);
        await user.save();

        return response.status(200).json(user.favorites);
    } catch (err) {
        if (err.name === 'CastError') {
            return response.status(400).json({ message: 'Invalid user ID or movie ID format.' });
        }
        return response.status(500).json({ message: 'Unexpected error, please contact an administrator.' });
    }
}

const userPostWatchlist = async (request, response, next) => {
    try {
        // pass
    } catch (err) {
        return response.status(500).json({ message: "Unexpected error, please contact an admnistrator." });
    }
}

// Récupération de l'historique de l'utilisateur
const userGetAllHistory = async (request, response, next) => {
    try {
        const userId = request.query.id;
        const user = await User.findById(userId).select('history');
        if (!user) {
            return response.status(404).json({ message: `User ${userId} not found.` });
        }
        return response.status(200).send(user.history);
    } catch (err) {
        if (err.name === "CastError") {
            return response.status(400).send(err.message);
        }
        return response.status(500).json({ message: "Unexpected error, please contact an administrator." });
    }
}

// Modification du champ de demande de suppression de compte
const userPatchDeleteAccount = async (request, response, next) => {
    const userId = request.query.id;

    if (!userId) {
        return response.status(400).json({ message: 'User id is required.' });
    }

    try {
        const user = await User.findByIdAndUpdate(userId, { deleteRequest: true }, { new: true });

        if (!user) {
            return response.status(404).json({ message: `User ${userId} not found.` });
        }

        return response.status(200).json(user);
    } catch (err) {
        if (err.name === 'CastError') {
            return response.status(400).json({ message: 'Invalid user id format.' });
        }
        return response.status(500).json({ message: 'Unexpected error, please contact an administrator.' });
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