import express from "express"
import { createCommnet, registerView, deleteComment } from "../controllers/videocontroller";

const apiRouter = express.Router();


apiRouter.post("/videos/:id([0-9a-f]{24})/view",registerView);
apiRouter.post("/videos/:id([0-9a-f]{24})/comment", createCommnet);
apiRouter.post("/videos/:id/deleteComment", deleteComment);












export default apiRouter