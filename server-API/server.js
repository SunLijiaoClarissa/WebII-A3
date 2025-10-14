const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const appAPI = require("./controllerAPI/api-controller");

const server = express();
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:false}));


//api
server.use("/api", appAPI);

//static
server.use(express.static("client"));



server.listen(3060);
console.log("Server is up now and running on port 3060");



