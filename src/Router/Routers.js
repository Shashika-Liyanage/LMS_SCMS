import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminL from '../Components/Layouts/Admin_Layout/AdminL';
import StudentL from '../Components/Layouts/Student_Layout/StudentL';
import LecturerL from '../Components/Layouts/Lecturer_Layout/LecturerL';
import Student from '../Components/Pages/Student/Student';
import Admin from '../Components/Pages/AdminLMS/Admin';
import Lecturer from '../Components/Pages/LecLMS/Lecturer';
import DegreeL from '../Components/Pages/LecLMS/Degree/DegreeL';
import CourseWork from '../Components/Pages/LecLMS/CourseWork';
import SubjectMaterials from '../Components/Pages/LecLMS/SubjectMaterials';
import StudentDetails from '../Components/Pages/LecLMS/StudentDetails';


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
        <Route path="degree" element={<DegreeL />} />
        <Route path="courseWork" element={<CourseWork />} />
        <Route path="subjectMaterials" element={<SubjectMaterials />} />
        <Route path="studentDetails" element={<StudentDetails />} />


      </Route>
    </Routes>
  );
};

export default Routers;
