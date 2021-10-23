const express = require("express");
const cors = require("cors");
const usersController = require("./controllers/usersController");
const classesController = require("./controllers/classeContoroller")

const server = express();
server.use(express.json());
const port = 3001

// If we need to allow access to the server only from a specific origin
//server.use(cors({ origin:"http://localhost:5000", credentials:true }));
server.use(cors());
server.listen(port, () => console.log("SAP server is listening on http://localhost:" + port));


//middlewear
server.use((req, res, next) => {
    //console.log(req);
    next();
  });


// server.get('/', (req, res, next) => {
//     res.send('Welcome Home');
//   });


//controllers 
server.use('/users', usersController);
server.use('/classes', classesController);





