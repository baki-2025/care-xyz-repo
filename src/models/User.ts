import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  nid?: string;
  contact?: string;
  authProvider: "credentials" | "google";
  role: "user" | "admin" | "caregiver";
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // optional for google signup
    nid: { type: String },
    contact: { type: String },
    authProvider: { type: String, enum: ["credentials", "google"], default: "credentials" },
    role: { type: String, enum: ["user", "admin", "caregiver"], default: "user" },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
