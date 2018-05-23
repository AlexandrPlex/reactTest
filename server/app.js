import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { serverPort } from '../etc/config.json';

import * as db from './utils/DataBaseUtils';

// Initialization of express application
const app = express();

// Set up connection of database
db.setUpConnection();

// Using bodyParser middleware
app.use( bodyParser.json() );

// Allow requests from any origin
app.use(cors({ origin: '*' }));

// RESTful api handlers

app.post('/login', (req, res) => {
    db.listUsers().then(data => {
    	// [...data].map((el)=>{
    	// 	if(el.login == req.dody.login){
    	// 		if(el.password == req.body.password){
    	// 			res.send('true');
    	// 		}
    	// 	}
    	// });
    	res.send(req.body.login);
    	res.send('false');
    });
});


const server = app.listen(serverPort, function() {
    console.log(`Server is up and running on port ${serverPort}`);
});
