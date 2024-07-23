import express from "express";
import {movieGetOne, movieGetAll, movieSearch} from "../controllers/movieController.js";

const router = express.Router();

// Routes d'accès public aux films
router.get('/movies/getOne/', movieGetOne);
router.get('/movies/getAll/', movieGetAll);
router.get('/movies/search/', movieSearch);

export default router;