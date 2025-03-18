import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../Pages/AdminLMS/AdminSidebar/AdminSidebar';
import Navbar from '../../NavBar/Navbar';

const AdminL = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
      <div style={{ width: '250px', height: '100vh', overflow: 'auto' }}>
        <AdminSidebar />
      </div>

      <div style={{ height: '100vh', width: '100%' }}>
        <Navbar />
        <div style={{ padding: 35 }}>
          <Outlet />
        </div>

      </div>
    </div>
  );
}

export default AdminL;