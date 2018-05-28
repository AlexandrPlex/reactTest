import mongoose from "mongoose";

const Schema = mongoose.Schema;

const StaffSchema = new Schema({
    fullName  : { type: String },
    adress    : { type: String },
    phone     : { type: String },
    salary    : { type: Number },
    __v       : { type: Number, select: false}
});

mongoose.model('Staff', StaffSchema);
