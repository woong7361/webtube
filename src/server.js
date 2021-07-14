
//express(서버) 관련 업무만 수행하기 위해 init.js와 분리시킴


//const express = require("express");
import express from "express";  //babel & nodemon required this expression
import morgan from "morgan";
import globalRouter from "./routers/globlaRouter"
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";

const PORT_NUMBER = 4000;


const app = express();
const logger = morgan("dev");

app.set("view engine", "pug")  //pug를 view engine으로 사용
app.set("views",process.cwd() + "/src/views"); //view directory 설정

app.use(logger);         //middleWare (log 보여줌)
app.use(express.urlencoded({extended: true})) //express가 form 형식을 이해하기 위해 
//middleware로서 먼저 처리해야 하기 떄문에 router보다 위에 있어야 한다. console.log(req.body)로 확인

app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;