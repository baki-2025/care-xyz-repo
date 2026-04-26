import { redirect } from "next/navigation";

export const metadata = {
  title: "Bookings | Care.IO",
  description: "Alias route for My Bookings.",
};

export default function BookingsPage() {
  redirect("/my-bookings");
}
