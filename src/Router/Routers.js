import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminL from '../Components/Layouts/Admin_Layout/AdminL';
import StudentL from '../Components/Layouts/Student_Layout/StudentL';
import LecturerL from '../Components/Layouts/Lecturer_Layout/LecturerL';
import Student from '../Components/Pages/Student/Student';
import Admin from '../Components/Pages/AdminLMS/Admin';
import Lecturer from '../Components/Pages/LecLMS/Lecturer';

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<StudentL />}>
        <Route index element={<Navigate to="/view-home" />} />
        <Route path = "/student" element={<Student />} />

      </Route>

      <Route path="/admin" element={<AdminL />}>
        {/* <Route index element={<Navigate to="/view-home" />} /> */}
        <Route path = "/admin" element={<Admin />} />
      </Route>

      <Route path="/lecturer" element={<LecturerL />}>
        {/* <Route index element={<Navigate to="/view-home" />} /> */}
        <Route path = "/lecturer" element={<Lecturer />} />

      </Route>
    </Routes>
  );
};

export default Routers;
