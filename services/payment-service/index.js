import express from express;

const app = express();

app.listen(5001, () =>{
    console.log("Server started at http://localhost:5001");
})