import mongoose from "mongoose";

import config from '../../etc/config.json';

import '../models/User';
import '../models/Organith';
import '../models/OrganithHeder'

const User = mongoose.model('User');
const OrganithHeder = mongoose.model('OrganithHeder');

export function setUpConnection() {
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
}

export function listUsers(data) {
    return User.find();
}

export function listData(needData){
	return mongoose.model(needData).find();
}
export function listHederData(needData){
	return OrganithHeder.find({nametable : needData});
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

