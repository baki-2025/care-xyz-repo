import mongoose, { Schema, Document, Types } from "mongoose";

export interface IBooking extends Document {
  user: Types.ObjectId;
  serviceName: string;
  date: Date;
  durationHours: number;
  totalPrice: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    serviceName: { type: String, required: true },
    date: { type: Date, required: true },
    durationHours: { type: Number, required: true, default: 1 },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ["pending", "confirmed", "completed", "cancelled"], default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);
