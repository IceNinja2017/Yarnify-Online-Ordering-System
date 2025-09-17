import express from "express";

const app = express();

app.listen(5002, () =>{
    console.log("Server started at http://localhost:5002");
})