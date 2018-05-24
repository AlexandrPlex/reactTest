import express from 'express';

import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';
import sesion from 'express-session';
import _MongoStore from 'connect-mongo';
import jwt from 'jwt-simple';

import { serverPort } from '../etc/config.json';
import * as db from './utils/DataBaseUtils';

// Initialization of express application
const app = express();
const MongoStore = _MongoStore(sesion);
// Set up connection of database
db.setUpConnection();
// Using bodyParser middleware
app.use( bodyParser.json() );
// Allow requests from any origin
app.use(cors({ origin: '*' }));


// RESTful api handlers

app.post('/login', (req, res) => {
    db.listUsers().then(data => {
    	[...data].map((el)=>{
    		if(el.login === req.body.login && el.password === req.body.password){
                let token = jwt.encode({id: data._id, name: data.name, login: data.login}, 'xxx');
    			res.send({
                    data: {
                        authorized: true,
                        token: token
                    }
                });
    		}
    	});
    	res.send({
    		data:{
    			authorized: false
    		}
    	});
    	
    });
});

app.post('/Organith', (req, res) =>{
	db.listOrganith().then(data=>res.send(data));
});

const server = app.listen(serverPort, function() {
    console.log(`Server is up and running on port ${serverPort}`);
});
