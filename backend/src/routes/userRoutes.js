import express from "express";
import {userPatch, userPostFavorites, userGetAllFavorites, userDeleteFavorites, userPostWatchlist, userGetAllHistory, userPatchDeleteAccount} from "../controllers/userController.js";
import userRegister from "../controllers/userRegister.js";
import checkTokenValid from "../middlewares/validationToken.js";
import userAuth from "../controllers/userAuth.js";
const userRouter = express.Router();

userRouter.post('/user/register',userRegister)

userRouter.post('/user/login', userAuth)

userRouter.patch('/user/', checkTokenValid, userPatch);
userRouter.post('/user/favorites/', checkTokenValid, userPostFavorites);
userRouter.get('/user/favorites/', checkTokenValid, userGetAllFavorites);
userRouter.delete('/user/favorites/', checkTokenValid, userDeleteFavorites);
userRouter.post('/user/watchlist/', checkTokenValid, userPostWatchlist);
userRouter.get('/user/history', checkTokenValid, userGetAllHistory);
userRouter.patch('/user/deleteAccount/', checkTokenValid, userPatchDeleteAccount);

export default userRouter;