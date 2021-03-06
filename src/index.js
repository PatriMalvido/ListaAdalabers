const express = require('express');
const cors = require('cors');
const res = require('express/lib/response');
const adalabers =require('./data/adalabers.json');

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

server.get('/adalabers',(req,res) =>{
  const response ={
    succes:true,
    adalabers: adalabers,
  };
 

  res.json(response);
});
