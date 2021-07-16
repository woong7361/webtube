import express from "express";
import {getJoin, 
    postJoin, 
    getLogin,
    postLogin
} from "../controllers/usercontroller"
import {home,
        search,
} from "../controllers/videocontroller"
const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/join", getJoin);
rootRouter.post("/join",postJoin);
rootRouter.get("/login",getLogin);
rootRouter.post("/login",postLogin);
rootRouter.get("/search",search);

export default rootRouter;