import express from "express";
import adminAuth from "../controllers/adminAuth.js";
import {movieAdd, movieUpdate, movieDelete} from "../controllers/adminController.js";
import checkTokenValid from "../middlewares/validationToken.js";

const router = express.Router();

router.post('/admin/login', adminAuth);

router.post('/admin/movies/', checkTokenValid, movieAdd);
router.patch('/admin/movies/', checkTokenValid, movieUpdate);
router.delete('/admin/movies/', checkTokenValid, movieDelete);

export default router;