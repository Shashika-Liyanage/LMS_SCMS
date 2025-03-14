import React from 'react';
import { Box, Typography, Modal, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

function StudentDetails({ subject, onClose }) {
  const students = [
    { name: 'Student Name', submittedTime: 'Pending', status: 'Pending', grade: '-', degree: '-' },
    { name: 'Student Name', submittedTime: 'Pending', status: 'Pending', grade: '-', degree: '-' },
    { name: 'Student Name', submittedTime: 'Pending', status: 'Pending', grade: '-', degree: '-' },
  ];

  return (
    <Modal
      open={true}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          width: '800px',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: 24,
          outline: 'none',
        }}
      >
        {/* Title */}
        <Typography variant="h5" fontWeight="bold" textAlign="center">
          Student Details - {subject}
        </Typography>
        <hr style={{ border: '2px solid #007bff', margin: '15px 0' }} />

        {/* Student Table */}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography fontWeight="bold">Student Name</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">Submitted Time</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">Status</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">Grade</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">Degree</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student, index) => (
              <TableRow key={index}>
                <TableCell>{student.name}</TableCell>
                <TableCell>
                  <Typography variant="body2">
                    <span role="img" aria-label="calendar">
                      📅
                    </span>{' '}
                    {student.submittedTime}
                  </Typography>
                </TableCell>
                <TableCell>{student.status}</TableCell>
                <TableCell>{student.grade}</TableCell>
                <TableCell>{student.degree}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Modal>
  );
}

export default StudentDetails;
