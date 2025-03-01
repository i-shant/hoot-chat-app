import type { IUser, IUserMethods, UserModel } from "../types";
import { model, Schema } from "mongoose";
import { compare, genSalt, hash, setRandomFallback } from "bcryptjs";
import crypto from "crypto";

setRandomFallback((len) => Array.from(crypto.randomBytes(len)));

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre("save", async function (next): Promise<void> {
  if (!this.isModified("password")) {
    next();
    return;
  }

  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
});

const User = model<IUser, UserModel>("User", userSchema);

export default User;
