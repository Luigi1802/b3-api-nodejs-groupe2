import express from "express";
import adminAuth from "../controllers/adminAuth.js";
import {movieAdd, movieUpdate, movieDelete, userGetAll, userGetOne} from "../controllers/adminController.js";
import checkTokenValid from "../middlewares/validationToken.js";

const router = express.Router();

// Route d'authentification en tant qu'admin
// (publique)
router.post('/admin/login', adminAuth);

// Routes de manipulation des films
router.post('/admin/movies/', checkTokenValid, movieAdd);
router.patch('/admin/movies/', checkTokenValid, movieUpdate);
router.delete('/admin/movies/', checkTokenValid, movieDelete);
// Routes de manipulation des utilisateurs
router.get('/admin/users/getAll', checkTokenValid, userGetAll);
router.get('/admin/users/getOne', checkTokenValid, userGetOne);

export default router;