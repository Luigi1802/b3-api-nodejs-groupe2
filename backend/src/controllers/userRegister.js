import express from "express";
const connectDB = require('../../connectionMedicalDb');
const mongoose = require('mongoose');
import {ActeMedical} from '../models/acteMedical-model';
import {error} from "console";


/**Post d'un utilisateur*/
const userPost = async (request, response) => {

    /**Récupérer les données de la requête*/
    const acteMedical = new ActeMedical({
        num_secu:request.body.num_secu,
        date:request.body.date,
        description:request.body.description,
        nom_service:request.body.nom_service,
        nom_medecin:request.body.nom_medecin,
        intitule_acte:request.body.intitule_acte,
    })
    try {

        /**Sauvgarde de l'actes medical*/
        const result = await acteMedical.save();

        /**Renvoyer une réponse de succès*/
        return response.status(201).json(result);
    } catch (err) {

        /**Renvoyer une réponse  d'echec*/
        return response.status(500).json({ message: 'Erreur serveur lors de la sauvegarde' });
    }
};