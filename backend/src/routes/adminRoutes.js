import express from "express";
import adminAut from "../controllers/adminAut.js";
import {movieAdd, movieUpdate, movieDelete} from "../controllers/adminController.js";

const router = express.Router();

router.post('/admin/login',adminAut);

router.post('/admin/movies/', movieAdd);
router.patch('/admin/movies/', movieUpdate);
router.delete('/admin/movies/', movieDelete);

export default router;