import {Schema, model, Document, ObjectId} from 'mongoose';

const mongoose = require('mongoose');

const movie = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    year: {
        type: Date,
        required: true,
    },
    rate: {
        type: Number,
        required: true,
    },
    actors: {
        type: [String],
        required:true,
    }
})

const Movie = mongoose.model('Movie',movie,'movies');

module.exports = Movie;