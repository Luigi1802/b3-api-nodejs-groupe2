import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
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
        default: 0,
    },
    favorites: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Movie'
        }
    ],
    watchlist: [
        {
            movieId: {
                type: Schema.Types.ObjectId,
                ref: 'Movie'
            },
            statusId: {
                type: Number,
                required: true
            }
        }
    ],
    history: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Movie'
        }
    ],
    recommandations: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Movie'
        }
    ]
});

const User = mongoose.model('User', UserSchema, 'User');

export default User;