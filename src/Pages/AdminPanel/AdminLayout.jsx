import AdminSidebar from ".././../Components/layout/AdminSideBar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 md:ml-4 p-4 bg-gray-100 ">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;