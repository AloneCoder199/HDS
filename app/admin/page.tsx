import { AdminDashboard } from "@/components/admin/admin-dashboard"

// ✅ Force dynamic — build time par prerender na ho
export const dynamic = "force-dynamic"

export default function AdminPage() {
  return (
    <div className="container mx-auto py-10">
      <AdminDashboard />
    </div>
  )
}