import express from "express";
import {adminConnexion} from "../controllers/adminAuth.js";
import {movieAdd, movieUpdate, movieDelete, userGetAll, userGetOne} from "../controllers/adminController.js";
import checkTokenValid from "../middlewares/validationToken.js";
import checkAdmin from "../middleWares/validationAdmin.js";

const router = express.Router();

// Route d'authentification en tant qu'admin
// (publique)
router.post('/admin/login', adminConnexion);

// Routes de manipulation des films
router.post('/admin/movies/', checkTokenValid,checkAdmin, movieAdd);
router.patch('/admin/movies/', checkTokenValid,checkAdmin, movieUpdate);
router.delete('/admin/movies/', checkTokenValid,checkAdmin, movieDelete);
// Routes de manipulation des utilisateurs
router.get('/admin/users/getAll', checkTokenValid,checkAdmin, userGetAll);
router.get('/admin/users/getOne', checkTokenValid,checkAdmin, userGetOne);

export default router;