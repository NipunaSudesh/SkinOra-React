import AdminLayout from "./AdminLayout";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="p-10 text-center">
        <h1 className="text-3xl font-bold text-primary">
          Admin Dashboard
        </h1>
        <p className="mt-4 text-gray-600">
          Only admins can see this page
        </p>
      </div>
    </AdminLayout>
  );
}