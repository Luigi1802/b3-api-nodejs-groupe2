import mongoose from 'mongoose';

const { Schema } = mongoose;

const WatchlistSchema = new Schema({
    idFilm: {
        type: String
    },
    status: {
        type: Number,
        required: true
    }
})

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    deleteRequest: {
        type: Number,
        required: true
    },
    favorites: [{idFilm: {type: String}}],
    watchlist: [WatchlistSchema],
    history: [{idFilm: {type: String}}],
    recommandations: [{idFilm: {type: String}}]
});

const User = mongoose.model('User', UserSchema, 'User');

export default User;