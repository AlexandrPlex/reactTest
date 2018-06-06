import mongoose from "mongoose";

const Schema = mongoose.Schema;

const StaffSchema = new Schema({
	_idPerent : { type: String },
    fullName  : { type: String },
    adress    : { type: String },
    phone     : { type: String },
    salary    : { type: Number },
    __v       : { type: Number, select: false}
});

mongoose.model('Staff', StaffSchema);
