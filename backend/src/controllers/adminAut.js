const connectDB = require('../../mongoDbConnexion.js');
const mongoose = require('mongoose');
import bcrypt from "bcryptjs";
import {sign} from "jsonwebtoken";
import dotenv from 'dotenv';
import {Admin} from "../models/adminModel.js";
dotenv.config();

/**Connexion de l'utilisateur*/
const adminConnexion = async (request, response) => {

    try {
        /**Recuperation des données dans le body de la requete*/
        const email = request.body.email;
        const password = request.body.password;

        /**Recherche le password utilisateur par l'email*/
        const result = await Admin.findOne({email:email});

        /**Test si le mots de passe en BDD correspond au mots de passe de la requete
         * Les mots de passes sont hashes en BDD */
        if (!result) {

            /**Si aucun résultat n'est trouvé, renvoyer une erreur 404*/
            return response.status(404).json({message: 'Utilisateur introuvable'});
        }
        const mots_de_pass_hash= result.password;

        /**Si les mots de passes correspondent alors on genere un token pour une session de 1 heure*/
        if (await bcrypt.compare(password, mots_de_pass_hash)) {
            const expiration = Math.floor(Date.now() / 1000) + (60 * 60);
            const payload = {user_id: email, exp: expiration};
            const token = sign(payload, process.env.SECRET_KEY);
            return response.status(201).json({token});
            console.log("connecte");
        } else {

            /**Renvoyer une réponse  mauvaise requete*/
            return response.status(400).json({message: 'Email ou mots de passe incorect'});
        }
    } catch (error) {

        /**Renvoyer une réponse d'echec*/
        response.status(500).json({message: 'Erreur serveur'});
    }
}
export default adminConnexion;