import express from "express";
import {movieGetOne,movieGetAll} from "../controllers/movieController.js";
const router = express.Router();


router.get('/movies/GetOne/',movieGetOne);
router.get('/movies/GetAll/',movieGetAll);


export default router;