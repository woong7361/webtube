import "./db.js"; //데이터베이스
import "./models//video"; //파일 자체를 import해 다른 모든 파일이 접근할 수 있도록 해줌
import app from "./server";

const PORT_NUMBER = 4000;

const handleListening = () => 
console.log(`Server is running on http://localhost:${PORT_NUMBER} `);

app.listen(PORT_NUMBER,handleListening);