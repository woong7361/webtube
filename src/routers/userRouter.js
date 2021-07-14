import express from "express";
import {edit, remove, see, logout} from "../controllers/usercontroller"

const userRouter = express.Router();

userRouter.get("/logout",logout);
userRouter.get("/edit", edit);
userRouter.get("/delete", remove);
userRouter.get("/:id", see);

export default userRouter;