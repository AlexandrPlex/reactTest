import mongoose from "mongoose";

const Schema = mongoose.Schema;

const OrganithSchema = new Schema({
	
    name      : { type: String },
    adress    : { type: String },
    phone     : { type: String },
    __v       : { type: Number, select: false}
});

mongoose.model('Organith', OrganithSchema);
