import express from 'express';

import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

import {serverPort, secret} from '../etc/config.json';
import * as db from './utils/DataBaseUtils';

// Initialization of express application
const app = express();

// Set up connection of database
db.setUpConnection();
// Using bodyParser middleware
app.use( bodyParser.json() );
// Allow requests from any origin
app.use(cors({ origin: '*' }));

const requireToken = (req,res,next) => {
  const token = req.body.token;

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: err.message })
    }
    req.params.userId = decoded._id
    next()
  })
}

// RESTful api handlers

app.post('/login', (req, res) => {
    db.listUsers().then(data => {
    	[...data].map((el)=>{
    		if(el.login === req.body.login && el.password === req.body.password){
                let token =jwt.sign({id: data._id, sess: true}, secret);
    			res.send({
                    isLogin: true,
                    token: token
                });
    		}
    	});
    	res.send({
            isLogin: false
    	});
    	
    });
});

app.post('/getData',requireToken,(req, res) =>{
  db.listData(req.body.needData, req.body.perent).then((data)=>{
    db.listHederData(req.body.needData).then((dataHeder)=>{
        res.send({
            data: data,
            dataHeder: dataHeder
        });
    });
  });
    
});

app.post('/setData',requireToken,(req, res) =>{
    
    db.setData(req.body.needData, req.body.data, req.body.perent).then((data)=>{
        console.log(data);
        res.send(data);
    });
});

app.delete('/delete',requireToken,(req, res) =>{
    db.deleteItem(req.body.id, req.body.needData).then((data)=>{

        res.send(data);
    });
});


const server = app.listen(serverPort, function() {
    console.log(`Server is up and running on port ${serverPort}`);
});


