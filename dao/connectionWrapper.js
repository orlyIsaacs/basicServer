const mySQL = require('mysql2');

// The connection data to the DB
const connection = mySQL.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "user-managment" //schema name
});

// Connecting to the DB
connection.connect((error) => {
    if (error) {
        console.log(`Failed To Create Connection: ${error}`);
        return;
    }
    console.log('You are connected to MySQL!');
});


function execute(SQL) {

    return new Promise((resolve, reject) => {
        connection.query(SQL, (error, result) => {
            if (error) {
                console.log("Failed interacting with DB, calling reject");
                console.log("error : " + error);
                reject(error);
                return;
            }
            resolve(result);
        });
    });
}

function executeWithParameters(SQL, parameters) {
    return new Promise((resolve, reject) => {
        connection.execute(SQL, parameters, (error, result) => {
            if (error) {
                console.log("Failed interacting with DB, calling reject");
                console.log("error : " + error);
                reject(error);
                return;
            }
            resolve(result);
        });
    });
}


module.exports = {
    execute,
    executeWithParameters
};