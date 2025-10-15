const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const appAPI = require("./controllerAPI/api-controller");
const adminAPI = require("./controllerAPI/admin-api-controller.js");



const server = express();
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:false}));

//api
server.use("/api", appAPI);
server.use("/admin", adminAPI);




server.listen(3060);
console.log("Server is up now and running on port 3060");


