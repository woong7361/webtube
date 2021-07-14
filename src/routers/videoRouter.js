import express from "express";
import {
    watch, 
    getEdit,
    getUpload,
    deleteVideo, 
    postEdit, 
    postUpload} from "../controllers/videocontroller"


const videoRouter = express.Router();

videoRouter.get("/upload",getUpload);
videoRouter.post("/upload",postUpload)
videoRouter.get("/:id(\\d+)", watch);
videoRouter.get("/:id(\\d+)/edit", getEdit);
videoRouter.post("/:id(\\d+)/edit", postEdit);
videoRouter.get("/:id(\\d+)/delete", deleteVideo);

export default videoRouter;