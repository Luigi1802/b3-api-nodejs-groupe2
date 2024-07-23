import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import {adminExist} from "../controllers/adminAuth.js";
dotenv.config();

/** Extraction du token*/
const extractToken = (authorization) => {
    if (typeof authorization !== 'string') {
        return false; // Vide retourn false
    }
    /**On isole le token*/
    const matches = authorization.match(/(bearer)\s+(\S+)/i);
    if (matches && matches[2]) {
        return matches[2];
    } else {
        return false;
    }
}
/** Verification du token*/
const checkAdmin = async  (request, response, next) => {
    const token = request.headers.authorization && extractToken(request.headers.authorization);
    if (!token) {
        return response.status(401).json({message: 'Invalid token.'})
    }
   const decodeToken = jwt.decode(token)
    try {
        const result = await adminExist(decodeToken.user_id)
        if (result){
        next();}
        else {
            return response.status(403).json({message:'User not admin'})}
    }catch{
        return response.status(500).json({message:'Error server'})
    }
    }
export default checkAdmin;