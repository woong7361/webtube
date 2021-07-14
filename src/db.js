import mongoose from "mongoose"

mongoose.connect("mongodb://127.0.0.1:27017/wetube", { 
    useNewUrlParser: true ,
    useUnifiedTopology: true,
    useFindAndModify: false,
 }
);


const db = mongoose.connection;
db.on("error", (error)=> console.log("DB Eroor", error));
db.once("open", () => console.log("DB connected successly"));
