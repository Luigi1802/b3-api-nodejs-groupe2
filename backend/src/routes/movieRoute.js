import express from "express";
import movieGetOne from "../controllers/movieController.js";
const router = express.Router();


router.get('/movie/GetOne/:title',movieGetOne)

export default router;