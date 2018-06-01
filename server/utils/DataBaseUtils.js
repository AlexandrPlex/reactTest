import mongoose from "mongoose";

import config from '../../etc/config.json';

import '../models/User';
import '../models/Organith';
import '../models/OrganithHeder';
import '../models/Filial';
import '../models/Staff';

const User = mongoose.model('User');
const OrganithHeder = mongoose.model('OrganithHeder');

export function setUpConnection() {
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
}

export function listUsers(data) {
    return User.find();
}

export function listData(collectionName, perent){
	if(perent){
		return mongoose.model(collectionName).find({_idPerent: perent});	
	}else{
		return mongoose.model(collectionName).find();
	}
}
export function listHederData(collectionName){
	return OrganithHeder.find({nametable : collectionName});
}

export function setData(needData, data, perent){
		const addData = mongoose.model(needData);
	    const datasave = new addData();
	    Object.keys(data).map((key)=>{
	    	datasave[key] = data[key];
	    });
	    if(needData!='Organith'){
	    	datasave._idPerent = perent;
	    }

	    return datasave.save();
}

export function deleteItem(id, needData) {
    return mongoose.model(needData).findById(id).remove();
}

// export function createNote(data) {
//     const note = new Note({
//         title: data.title,
//         text: data.text,
//         color: data.color,
//         createdAt: new Date()
//     });

//     return note.save();
// }

// export function deleteNote(id) {
//     return Note.findById(id).remove();
// }

