import express from "express";
import {movieAdd} from "../controllers/adminController.js";
import adminAut from "../controllers/adminAut.js";
const router = express.Router();

router.post('/admin/login',adminAut);


router.post('/admin/movies/', movieAdd);

export default router;