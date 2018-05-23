import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name         : { type: String },
    login        : { type: String },
    password     : { type: String },
});

mongoose.model('User', UserSchema);
