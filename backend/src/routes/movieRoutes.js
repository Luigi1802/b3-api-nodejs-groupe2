import express from "express";
import {movieGetOne, movieGetAll, movieSearch} from "../controllers/movieController.js";
import checkTokenValid from "../middleWares/validationToken.js";

const router = express.Router();

router.get('/movies/getOne/', movieGetOne);
router.get('/movies/getAll/', movieGetAll);
router.get('/movies/search/', movieSearch);

export default router;