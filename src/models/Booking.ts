import mongoose, { Schema, Document, Types } from "mongoose";

export interface IBooking extends Document {
  user: Types.ObjectId;
  serviceName: string;
  serviceId: string;
  date: Date;
  durationPlan: "Hourly" | "Daily";
  durationValue: number;
  location: {
    division: string;
    district: string;
    area: string;
    postCode?: string;
    address: string;
  };
  totalPrice: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    serviceName: { type: String, required: true },
    serviceId: { type: String, required: true },
    date: { type: Date, required: true },
    durationPlan: { type: String, enum: ["Hourly", "Daily"], required: true, default: "Hourly" },
    durationValue: { type: Number, required: true, default: 4 },
    location: {
      division: { type: String, required: true },
      district: { type: String, required: true },
      area: { type: String, required: true },
      postCode: { type: String },
      address: { type: String, required: true },
    },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ["pending", "confirmed", "completed", "cancelled"], default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);
