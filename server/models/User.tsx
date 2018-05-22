import * as mongoose from "mongoose";

export interface IUser {
  name?    : string;
  login?   : string;
  password?: string;
}

export interface IUserModel extends IUser, mongoose.Document {
  fullName(): string;
}

export var UserSchema: mongoose.Schema = new mongoose.Schema({
  createdAt: Date,
  email: String,
  firstName: String,
  lastName: String
});



UserSchema.methods.fullName = function(): string {
  return this;
};

export const User: mongoose.Model<IUserModel> = mongoose.model<IUserModel>("User", UserSchema);