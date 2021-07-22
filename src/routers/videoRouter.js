import express from "express";
import {watch, 
        getEdit,
        getUpload,
        deleteVideo, 
        postEdit, 
        postUpload
} from "../controllers/videocontroller"
import { protectMiddleware, videoUpload } from "../middlewares";


const videoRouter = express.Router();


videoRouter.get("/upload", protectMiddleware,getUpload);
videoRouter.post("/upload",protectMiddleware ,videoUpload.single("video") ,postUpload)
videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.get("/:id([0-9a-f]{24})/edit", protectMiddleware, getEdit);
videoRouter.post("/:id([0-9a-f]{24})/edit", protectMiddleware, postEdit);
videoRouter.get("/:id([0-9a-f]{24})/delete", protectMiddleware, deleteVideo);

export default videoRouter;