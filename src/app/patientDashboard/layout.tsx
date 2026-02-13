import ProtectedRoute from "@/components/auth/ProtectedRoute"

export default function PatientDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute allowedRoles="patient">
      {children}
    </ProtectedRoute>
  )
}
