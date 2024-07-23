import express from "express";
<<<<<<< HEAD
import {userPatch, userPostFavorites, userGetAllFavorites, userDeleteFavorites, userPostWatchlist, userGetAllHistory, userPatchDeleteAccount} from "../controllers/userController.js";
=======
import {userPatch,
    userPostFavorites,
    userGetAllFavorites,
    userDeleteFavorites,
    userPostWatchlist,
    userGetAllHistory,
    userPatchDeleteAccount} from "../controllers/userController.js";
import userRegister from "../controllers/userRegister.js";
>>>>>>> c9e20582c78d45868b5bbedb67e4bff24e5f3838
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