import express from "express";
import {movieAdd, movieUpdate, movieDelete} from "../controllers/adminController.js";
const router = express.Router();

router.post('/admin/movies/', movieAdd);
router.patch('/admin/movies/', movieUpdate);
router.delete('/admin/movies/', movieDelete);

export default router;