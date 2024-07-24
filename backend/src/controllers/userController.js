import User from "../models/userModel.js";
import Movie from "../models/movieModel.js";

// Modification des données de l'utilisateur
const userPatch = async (request, response, next) => {
    // #swagger.tags = ['User']
    try {
        const userId = request.query.id;

        // Vérification qu'un id est passé dans la requête
        if (!userId) {
            return response.status(400).json({ message: "User id is required." });
        }

        const userData = request.body;

        // Ciblage de l'utilisateur à partir de l'id et mise a jour avec les données du body
        const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true });
        if (!updatedUser) {
            // Si l'utilisateur n'est pas déjà présent en BDD, erreur 404
            response.status(404).json({ message: `User ${userId} not found.` });
        }
        return response.status(200).send(updatedUser);
    } catch (err) {
        if (err.name === "CastError") {
            // Si les données de l'utilisateur entrées dans le body sont incorrectes, erreur 400
            return response.status(400).send(err.message);
        }
        return response.status(500).json({ message: "Unexpected error, please contact an admnistrator." });
    }
}

const userPostFavorites = async (request, response, next) => {
    // #swagger.tags = ['User']
    try {
        const userId = request.query.id;
        const movieId = request.body.id;

        // Vérification qu'un id d'utilisateur est passé dans la requête
        if (!userId) {
            return response.status(400).json({ message: 'User id is required.' });
        }

        // Vérification qu'un id de film est passé dans la requête
        if (!movieId) {
            return response.status(400).json({ message: 'Movie id is required.' });
        }

        const movie = await Movie.findById(movieId);
        if (!movie) {
            // Si le film n'est pas déjà présent en BDD, erreur 404
            return response.status(404).json({ message: `Movie ${movieId} not found.` });
        }

        const user = await User.findById(userId);
        if (!user) {
            // Si l'utilisateur n'est pas déjà présent en BDD, erreur 404
            return response.status(404).json({ message: `User ${userId} not found.` });
        }

        if (user.favorites.includes(movieId)) {
            // Si le film est déjà présent dans les favoris de l'utilisateur, erreur 409
            return response.status(409).json({ message: 'Movie is already in the favorites list.' });
        }

        user.favorites.push(movieId);
        await user.save();

        return response.status(200).json(user.favorites);
    } catch (err) {
        if (err.name === 'CastError') {
            // Si les id entrés dans le body sont incorrects, erreur 400
            return response.status(400).json({ message: 'Invalid User id or Movie id format.' });
        }
        return response.status(500).json({ message: 'Unexpected error, please contact an administrator.' });
    }
}

// Récupération des favoris de l'utilisateur
const userGetAllFavorites = async (request, response, next) => {
    // #swagger.tags = ['User']
    try {
        const userId = request.query.id;
        // Vérification qu'un id d'utilisateur est passé dans la requête
        if (!userId) {
            return response.status(400).json({ message: 'User id is required.' });
        }
        const user = await User.findById(userId).select('favorites');
        if (!user) {
            // Si le film n'est pas déjà présent en BDD, erreur 404
            return response.status(404).json({ message: `User ${userId} not found.` });
        }
        return response.status(200).send(user.favorites);
    } catch (err) {
        if (err.name === "CastError") {
            // Si l'id entré dans le body est incorrect, erreur 400
            return response.status(400).send(err.message);
        }
        return response.status(500).json({ message: "Unexpected error, please contact an administrator." });
    }
}

// Supprimer un film de la liste de favoris d'un utilisateur
const userDeleteFavorites = async (request, response, next) => {
    // #swagger.tags = ['User']
    const userId = request.query.id;
    const movieId = request.body.id;

    // Vérification qu'un id d'utilisateur est passé dans la requête
    if (!userId) {
        return response.status(400).json({ message: 'User id is required.' });
    }

    const movie = await Movie.findById(movieId);
    if (!movie) {
        // Si le film n'est pas déjà présent en BDD, erreur 404
        return response.status(404).json({ message: `Movie ${movieId} not found.` });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            // Si l'utilisateur n'est pas déjà présent en BDD, erreur 404
            return response.status(404).json({ message: `User ${userId} not found.` });
        }

        const favoriteIndex = user.favorites.indexOf(movieId);
        if (favoriteIndex === -1) {
            // Si le film n'est pas déjà en favori, erreur 404
            return response.status(404).json({ message: 'Movie not found in favorites list.' });
        }

        user.favorites.splice(favoriteIndex, 1);
        await user.save();

        return response.status(200).json(user.favorites);
    } catch (err) {
        if (err.name === 'CastError') {
            // Si les id entrés dans le body sont incorrects, erreur 400
            return response.status(400).json({ message: 'Invalid User id or Movie id format.' });
        }
        return response.status(500).json({ message: 'Unexpected error, please contact an administrator.' });
    }
}

const userPostWatchlist = async (request, response, next) => {
    // #swagger.tags = ['User']
    try {
        const userId = request.query.id;
        const movieId = request.body.id;
        const statusId = request.body.statusId;

        // Vérification qu'un id d'utilisateur est passé dans la requête
        if (!userId) {
            return response.status(400).json({ message: 'User id is required.' });
        }

        // Vérification qu'un id de film est passé dans le body
        if (!movieId) {
            return response.status(400).json({ message: 'Movie id is required.' });
        }

        // Vérification qu'un statut est passé dans le body
        if (statusId === undefined) {
            return response.status(400).json({ message: 'Status id is required.' });
        }

        const movie = await Movie.findById(movieId);
        if (!movie) {
            // Si le film n'est pas déjà présent en BDD, erreur 404
            return response.status(404).json({ message: `Movie ${movieId} not found.` });
        }

        const user = await User.findById(userId);
        if (!user) {
            // Si l'utilisateur' n'est pas déjà présent en BDD, erreur 404
            return response.status(404).json({ message: `User ${userId} not found.` });
        }

        const movieInWatchlist = user.watchlist.find(watchlistItem => watchlistItem.movieId.toString() === movieId);
        if (movieInWatchlist) {
            // Si le film est pas déjà en liste de lecture, erreur 400
            return response.status(400).json({ message: 'Movie is already in the watchlist.' });
        }

        user.watchlist.push({ movieId, statusId });
        await user.save();

        return response.status(200).json(user.watchlist);
    } catch (err) {
        if (err.name === 'CastError') {
            // Si les id entrés dans le body sont incorrects, erreur 400
            return response.status(400).json({ message: 'Invalid User id or Movie id format.' });
        }
        return response.status(500).json({ message: 'Unexpected error, please contact an administrator.' });
    }
}

// Récupération de l'historique de l'utilisateur
const userGetAllHistory = async (request, response, next) => {
    // #swagger.tags = ['User']
    try {
        const userId = request.query.id;
        // Vérification qu'un id d'utilisateur est passé dans la requête
        if (!userId) {
            return response.status(400).json({ message: 'User id is required.' });
        }
        const user = await User.findById(userId).select('history');
        if (!user) {
            // Si l'utilisateur' n'est pas déjà présent en BDD, erreur 404
            return response.status(404).json({ message: `User ${userId} not found.` });
        }
        return response.status(200).send(user.history);
    } catch (err) {
        if (err.name === "CastError") {
            // Si l'id entré dans le body est incorrect, erreur 400
            return response.status(400).send(err.message);
        }
        return response.status(500).json({ message: "Unexpected error, please contact an administrator." });
    }
}

// Modification du champ de demande de suppression de compte
const userPatchDeleteAccount = async (request, response, next) => {
    // #swagger.tags = ['User']
    const userId = request.query.id;

    // Vérification qu'un id d'utilisateur est passé dans la requête
    if (!userId) {
        return response.status(400).json({ message: 'User id is required.' });
    }

    try {
        const user = await User.findByIdAndUpdate(userId, { deleteRequest: true }, { new: true });

        if (!user) {
            // Si l'utilisateur' n'est pas déjà présent en BDD, erreur 404
            return response.status(404).json({ message: `User ${userId} not found.` });
        }

        return response.status(200).json(user);
    } catch (err) {
        if (err.name === 'CastError') {
            // Si l'id entré dans le body est incorrect, erreur 400
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