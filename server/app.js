import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import {userList, setUpConnection} from './loginUtils/loginUtils.tsx';


const app = express();

// Set up connection of database
setUpConnection();

// Using bodyParser middleware
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use( bodyParser.json() );

app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Allow requests from any origin
app.use(cors({ origin: '*' }));

// RESTful api handlers
app.post('/login', (req, res) => {
		console.log(req.body);
		console.log();
	var login = 'admin';
	var password = '20e0cbcd3cf233b748ebc24193b9afa7bfd8636b';

		res.send(JSON.stringify({data:{authorized:true}}));


});



const server = app.listen(8080, function() {
    console.log(`Server is up and running on port 8080`);
});


// import multer from 'multer';
// import { serverPort } from '../etc/config.json';
// import * as db from './utils/DataBaseUtils';

// app.post('/notes', (req, res) => {
//     db.createNote(req.body).then(data => res.send(data));
// });

// app.delete('/notes/:id', (req, res) => {
//     db.deleteNote(req.params.id).then(data => res.send(data));
// });

// app.post('/authentication', upload.array(), (req, res) => {
// 	console.log(req.json);
// 	res.json(req);
//     // db.authUsers(req.body).then(data => res.send(data));
// });