import AdminDashboardClient from "./AdminDashboardClient";

export const metadata = {
  title: "Admin Dashboard | Care.xyz",
  description: "Manage booking and payment histories for Care.xyz from the admin panel.",
};

export default function AdminDashboardPage() {
  return <AdminDashboardClient />;
}
