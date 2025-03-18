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
import CourseMaterial from '../Components/Pages/CourseMaterial';
import CourseDetails from '../Components/Pages/Student/CourseDetails';
import DegreeA from '../Components/Pages/AdminLMS/Degree/DegreeA';
import User from '../Components/Pages/AdminLMS/user/user';
import StudentRegistrationForm from '../Components/Pages/AdminLMS/user/student/StudentRegistrationForm';
import LecturerRegistrationForm from '../Components/Pages/AdminLMS/user/lecture/LectureRegistrationForm';
import TimeSheduleRoute from '../Components/Pages/AdminLMS/class-time-tables/ClassTimesRoute'
import TimeTable from '../Components/Pages/Student/components/TimeTable';

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<StudentL />}>
        <Route index element={<Navigate to="/view-home" />} />
        <Route path = "/student" element={<Student />} />
        <Route path="/course-materials" element={<CourseMaterial />} />
        <Route path="/course-details" element={<CourseDetails />} />
        <Route path="/timetable" element={<TimeTable />} />
         
      </Route>

      <Route path="/admin" element={<AdminL />}>
        {/* <Route index element={<Navigate to="/view-home" />} /> */}
        <Route index path = "/admin" element={<Admin />} />
        <Route path = "user" element={<User />} />
        {/* <Route path = "/user/new" element={<Admin />} /> */}
        <Route path = "degreeAdmin" element={<DegreeA />} />
        <Route path = "register/student" element={<StudentRegistrationForm />} />
        <Route path = "register/lecturer" element={<LecturerRegistrationForm />} />

        <Route path = "class-times/*" element={<TimeSheduleRoute />} />
         
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
