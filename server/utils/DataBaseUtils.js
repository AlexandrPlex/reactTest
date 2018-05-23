import mongoose from "mongoose";

import config from '../../etc/config.json';

import '../models/User';
import '../models/Organith';

const User = mongoose.model('User');
const Organith = mongoose.model('Organith');

export function setUpConnection() {
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
}

export function listUsers(data) {
    return User.find();
}

export function listOrganith(){
	return Organith.find();
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

