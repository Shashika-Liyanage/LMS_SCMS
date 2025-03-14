import React, { useState } from 'react';
import LecturerSidebar from '../LecturerSidebar/LecturerSidebar';
import Navbar from '../../../NavBar/Navbar';
import { Box, Typography, Grid } from '@mui/material';
import CourseWork from '../CourseWork';
import SubjectMaterials from '../SubjectMaterials';
import StudentDetails from '../StudentDetails';

function DegreeL() {
  const subjects = ['Advanced Data Modeling', 'Machine Learning', 'Software Engineering'];
  const menuItems = ['Course Work', 'Subject Materials', 'Student Details'];

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseWorkOpen, setCourseWorkOpen] = useState(false);
  const [subjectMaterialsOpen, setSubjectMaterialsOpen] = useState(false);
  const [studentDetailsOpen, setStudentDetailsOpen] = useState(false);

  const handleCourseWorkClick = (subject) => {
    setSelectedCourse(subject);
    setCourseWorkOpen(true);
  };

  const handleSubjectMaterialsClick = (subject) => {
    setSelectedCourse(subject);
    setSubjectMaterialsOpen(true);
  };

  const handleStudentDetailsClick = (subject) => {
    setSelectedCourse(subject);
    setStudentDetailsOpen(true);
  };

  const handleCloseCourseWork = () => {
    setCourseWorkOpen(false);
    setSelectedCourse(null);
  };

  const handleCloseSubjectMaterials = () => {
    setSubjectMaterialsOpen(false);
    setSelectedCourse(null);
  };

  const handleCloseStudentDetails = () => {
    setStudentDetailsOpen(false);
    setSelectedCourse(null);
  };

  return (
    <>
      <LecturerSidebar />
      <Navbar />

      <Box sx={{ marginLeft: { md: '350px' }, padding: '20px' }}>
        <Grid container spacing={4} sx={{ maxWidth: '900px' }}>
          {subjects.map((subject, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Box
                sx={{
                  backgroundColor: '#83C1E9',
                  padding: '20px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  boxShadow: 2,
                  marginBottom: '20px',
                }}
              >
                <Typography variant="h6" fontWeight="bold">
                  {subject}
                </Typography>
              </Box>
              <Box sx={{ marginTop: '15px', paddingX: '10px' }}>
                {menuItems.map((item, idx) => (
                  <Typography
                    key={idx}
                    variant="body1"
                    fontWeight="bold"
                    sx={{
                      paddingY: '12px',
                      borderBottom: '3px solid #007bff',
                      cursor: 'pointer',
                      marginBottom: '10px',
                    }}
                    onClick={() =>
                      item === 'Course Work'
                        ? handleCourseWorkClick(subject)
                        : item === 'Subject Materials'
                        ? handleSubjectMaterialsClick(subject)
                        : item === 'Student Details'
                        ? handleStudentDetailsClick(subject)
                        : null
                    }
                  >
                    {item}
                  </Typography>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Render CourseWork Popup */}
      {courseWorkOpen && selectedCourse && (
        <CourseWork subject={selectedCourse} onClose={handleCloseCourseWork} />
      )}

      {/* Render SubjectMaterials Popup */}
      {subjectMaterialsOpen && selectedCourse && (
        <SubjectMaterials subject={selectedCourse} onClose={handleCloseSubjectMaterials} />
      )}

      {/* Render StudentDetails Popup */}
      {studentDetailsOpen && selectedCourse && (
        <StudentDetails subject={selectedCourse} onClose={handleCloseStudentDetails} />
      )}
    </>
  );
}

export default DegreeL;
