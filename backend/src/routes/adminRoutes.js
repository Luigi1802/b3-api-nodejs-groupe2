import express from "express";
import {movieAdd} from "../controllers/adminController.js";
const router = express.Router();

router.post('/admin/movies/', movieAdd);

export default router;