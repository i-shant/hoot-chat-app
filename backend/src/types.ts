import type { Request } from "express";
import type { Model, ObjectId } from "mongoose";
import User from "./models/user.model";

export interface IRequestWithUser extends Request {
  user?: InstanceType<typeof User>;
}

/* USER */
export interface IUser {
  name: string;
  email: string;
  password: string;
}
export interface IUserMethods {
  matchPassword(enteredPassword: string): Promise<boolean>;
}
export type UserModel = Model<IUser, {}, IUserMethods>;

/* CHAT */
export interface IChat {
  members: ObjectId[];
  lastMessage: ObjectId;
}

/* MESSAGE */
export interface IMessage {
  sender: ObjectId;
  content: string;
  chat: ObjectId;
  readBy: ObjectId[];
}

export interface IPayload {
  userId: string;
}

export type EmitData<T> = {
  event: string;
  arg?: T;
};
