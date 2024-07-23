import express from "express";
import {userPatch,
    userPostFavorites,
    userGetAllFavorites,
    userDeleteFavorites,
    userPostWatchlist,
    userGetAllHistory,
    userPatchDeleteAccount} from "../controllers/userController.js";
import checkTokenValid from "../middleWares/validationToken.js";
import userAut from "../controllers/userAut.js";
const userRouter = express.Router();

userRouter.post('/user/login', userAut)

userRouter.patch('/user/',checkTokenValid, userPatch);
userRouter.post('/user/favorites/', userPostFavorites);
userRouter.get('/user/favorites/', userGetAllFavorites);
userRouter.delete('/user/favorites/', userDeleteFavorites);
userRouter.post('/user/watchlist/', userPostWatchlist);
userRouter.get('/user/history',checkTokenValid, userGetAllHistory);
userRouter.patch('/user/deleteAccount/', userPatchDeleteAccount)

export default userRouter;