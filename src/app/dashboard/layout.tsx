'use client';

import { ProtectedRoute } from '@/components/auth/protected-route';
import Navbar from '@/components/layout/navbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-16 pb-12">
          {children}
        </div>
      </div>
    </ProtectedRoute>
  );
}