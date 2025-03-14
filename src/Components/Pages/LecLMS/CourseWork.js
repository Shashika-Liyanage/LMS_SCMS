import React from 'react';
import { Box, Typography, Modal, Button, TextField } from '@mui/material';

function CourseWork({ subject, onClose }) {
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
          width: '600px',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: 24,
          outline: 'none',
        }}
      >
        {/* Title */}
        <Typography variant="h5" fontWeight="bold" textAlign="center">
          Course Work ({subject})
        </Typography>
        <hr style={{ border: '2px solid #007bff', margin: '15px 0' }} />

        {/* Notice Box */}
        <Box
          sx={{
            border: '1px solid black',
            padding: '15px',
            borderRadius: '5px',
            marginBottom: '20px',
          }}
        >
          <Typography variant="body1" mb={2}>
            Please note that {subject} coursework is issued as a "Draft Coursework and it is Subject to Moderation". Please submit the coursework on or before 30th March 2025 before 3:55 p.m. via ELMS.
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            Submission Time: 30/03/2025 15:55
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            Marks Release Time: 14/05/2025 10:29
          </Typography>
        </Box>

        {/* Resource Section */}
        <Typography variant="h6" mb={1}>
          Resource
        </Typography>
        <Box
          sx={{
            border: '1px dashed gray',
            padding: '20px',
            textAlign: 'center',
            borderRadius: '5px',
            marginBottom: '20px',
          }}
        >
          <Typography variant="body2" mb={1}>
            Drag and Drop your file
          </Typography>
          <Button
            variant="contained"
            component="label"
            sx={{ backgroundColor: '#007bff', color: 'white' }}
          >
            Upload
            <input type="file" hidden />
          </Button>
        </Box>

        {/* Close Button */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: 'red',
            color: 'white',
            width: '100%',
          }}
          onClick={onClose}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
}

export default CourseWork;
