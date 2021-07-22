import express from "express";
import {getEdit,
        postEdit,
        remove, 
        see, 
        logout, 
        startGithubLogin,
        finsithGithubLogin,
        getChangePassword,
        postChangePassword
    } from "../controllers/usercontroller"
import { avatarUpload, protectMiddleware, publicOnlyMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout",logout);
userRouter.get("/edit", getEdit);
userRouter.post("/edit", avatarUpload.single("avatar"), postEdit);
userRouter.get("/delete", remove);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finsithGithubLogin);
userRouter.route("/change-password").get(getChangePassword).post(postChangePassword);
userRouter.get("/:id", see);

export default userRouter;