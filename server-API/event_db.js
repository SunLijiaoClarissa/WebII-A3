// Import required modules 
const mysql = require("mysql2");
// const bodyParser = require("body-parser");

// Import our db details
var db = require("./db-details");

// Create db Connection
module.exports = {
    getConnection: ()=>{
        return mysql.createConnection({
            host: db.host,
            port: db.port,
            user: db.user,
            password: db.password,
            database: db.database 
        });
    }
};