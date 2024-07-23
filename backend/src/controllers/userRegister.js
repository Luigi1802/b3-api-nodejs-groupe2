import User from "../models/userModel.js";
import bcrypt from "bcrypt";

/**Post d'un utilisateur*/
const userPost = async (request, response) => {
    try {
    const passwordHash = await  hashPassword(request.body.password);
    const user =  new User({
                email:request.body.email,
                name:request.body.name,
                surname:request.body.surname,
                password:passwordHash})
        /**Sauvgarde de l'actes medical*/
        const result = await user.save();
        /**Renvoyer une réponse de succès*/
        return response.status(201).json(result);
    } catch (err) {
        /**Renvoyer une réponse  d'echec*/
        return response.status(500).json({ message: 'Erreur serveur lors de la sauvegarde' , err});
    }
};
const hashPassword = async (password) =>{
    try {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (err) {
        console.error(err.message);
        throw new Error('Error hashing password');
    }
}
export default userPost;