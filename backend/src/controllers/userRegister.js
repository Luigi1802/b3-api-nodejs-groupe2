import User from "../models/userModel.js";
import bcrypt from "bcrypt";

/**Post d'un utilisateur */
const userRegister = async (request, response) => {
    // #swagger.tags = ['Publique']
    const {email, name, surname, password} = request.body;

    if (!email || !name || !surname || !password) {
        /**S'il manque un paramètre dans le body, renvoyer une erreur 400*/
        return response.status(400).json({message: 'An email, a name, a surname and a password are required to register.'});
    }

    const userExists = await User.findOne({email: email});

    if (userExists) {
        return response.status(409).json({message: 'A User with this email already exists.'});
    }

    try {
        const passwordHash = await hashPassword(password);
        const user = new User({
                email: email,
                name: name,
                surname: surname,
                password: passwordHash})
        const result = await user.save();
        /**Renvoyer une réponse de succès*/
        return response.status(201).json(result);
    } catch (err) {
        /**Renvoyer une réponse  d'echec*/
        return response.status(500).json({ message: 'Unexpected error, please contact an admnistrator.'});
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
        throw new Error('Error while hashing password');
    }
}
export {userRegister};