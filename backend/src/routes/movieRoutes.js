import express from "express";
import {movieGetOne, movieGetAll} from "../controllers/movieController.js";
const router = express.Router();


router.get('/movies/getOne/',movieGetOne);
router.get('/movies/getAll/',movieGetAll);

export default router;