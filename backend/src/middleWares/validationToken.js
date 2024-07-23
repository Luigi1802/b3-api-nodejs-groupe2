import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

/** Extraction du token*/
const extractToken = (authorization) => {
    if (typeof authorization !== 'string') {
        return false;// Vide retourn false
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
const checkTokenValid = (request, response, next) => {
    const token = request.headers.authorization && extractToken(request.headers.authorization)
console.log("token")
    if (!token) {
        return response.status(401).json({message: 'token non valide ou absent!'})
    }
    /**On verifie le token*/
    jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
        if (err) {
            return response.status(401).json({message: 'Bad token'})
        }
        next();
    })

}
export default checkTokenValid;