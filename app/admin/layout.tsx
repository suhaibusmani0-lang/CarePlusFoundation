import AdminLayoutClient from "@/components/admin/AdminLayoutClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Care Plus Foundation",
  description: "Admin dashboard for Care Plus Foundation Trust",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
