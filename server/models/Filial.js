import mongoose from "mongoose";

const Schema = mongoose.Schema;

const FilialSchema = new Schema({
	_idPerent : { type: String },
    city      : { type: String },
    adress    : { type: String },
    phone     : { type: String },
    __v       : { type: Number, select: false}
});

mongoose.model('Filial', FilialSchema);
