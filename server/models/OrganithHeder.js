import mongoose from "mongoose";

const Schema = mongoose.Schema;

const OrganithSchema = new Schema({
	_id       : { type: Object, select: false },
	nametable : { type: String, select: false },
    name      : { type: String },
    adress    : { type: String },
    phone     : { type: String },
});

mongoose.model('OrganithHeder', OrganithSchema);
