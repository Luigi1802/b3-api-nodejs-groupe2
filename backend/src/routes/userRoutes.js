import express from "express";
import {userPatch,
    userPostFavorites,
    userGetAllFavorites,
    userDeleteFavorites,
    userPostWatchlist,
    userGetAllHistory,
    userPatchDeleteAccount} from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.patch('/user/', userPatch);
userRouter.post('/user/favorites/', userPostFavorites);
userRouter.get('/user/favorites/', userGetAllFavorites);
userRouter.delete('/user/favorites/', userDeleteFavorites);
userRouter.post('/user/watchlist/', userPostWatchlist);
userRouter.get('/user/hisory', userGetAllHistory);
userRouter.patch('/user/deleteAccount/', userPatchDeleteAccount)

export default userRouter;