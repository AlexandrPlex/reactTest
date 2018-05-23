import * as mongoose from "mongoose";

import '../models/User.tsx';

const User = mongoose.model('User');

export function setUpConnection() {
    mongoose.connect(`mongodb://localhost:8080/users`);
}

export function userList() {
    return User.find();
}