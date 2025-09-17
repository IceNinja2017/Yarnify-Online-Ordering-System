import express from "express";
import dotenv from "dotenv-flow";

const app = express();

//global env
dotenv.config({path: "../.env"});

//service specific
dotenv.config();

app.listen(5002, () =>{
    console.log("Server started at http://localhost:5002");
})