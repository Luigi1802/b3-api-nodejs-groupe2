import mongoose from 'mongoose';

const { Schema } = mongoose;

const ProducerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    }
}, { _id: false });

const DirectorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    }
}, { _id: false });

const ActorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    }
}, { _id: false });

const MovieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    producers: [ProducerSchema],
    directors: [DirectorSchema],
    actors: [ActorSchema],
    genres: {
        type: [String],
        required: true
    }
});

const Movie = mongoose.model('Movie', MovieSchema,'Movie');

export default Movie;
