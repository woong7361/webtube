import mongoose from "mongoose"

mongoose.connect(process.env.DB_URL, { 
    useNewUrlParser: true ,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
 }
);


const db = mongoose.connection;
db.on("error", (error)=> console.log("DB Eroor", error));
db.once("open", () => console.log("DB connected successly"));
