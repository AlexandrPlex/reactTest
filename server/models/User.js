import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name         : { type: String },
    login        : { type: String },
    password     : { type: String/*, select: false*/}, // тключаетваборку пароля, и нужно явно указываль пароль для его выборки
});

mongoose.model('User', UserSchema);
