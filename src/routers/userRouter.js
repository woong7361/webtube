import express from "express";
import {edit,
        remove, 
        see, 
        logout, 
        startGithubLogin,
        finsithGithubLogin
    } from "../controllers/usercontroller"

const userRouter = express.Router();

userRouter.get("/logout",logout);
userRouter.get("/edit", edit);
userRouter.get("/delete", remove);
userRouter.get("/github/login",startGithubLogin);
userRouter.get("/github/finish", finsithGithubLogin);
userRouter.get("/:id", see);

export default userRouter;