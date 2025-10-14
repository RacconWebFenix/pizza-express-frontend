"use client";

import { AdminRoute } from "@/components/ProtectedRoute";
import MainLayout from "@/components/layout/MainLayout";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminRoute>
      <MainLayout>{children}</MainLayout>
    </AdminRoute>
  );
}
