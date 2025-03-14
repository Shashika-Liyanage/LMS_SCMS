import React from 'react';
import { Box, Typography, Modal, Button } from '@mui/material';

function SubjectMaterials({ subject, onClose }) {
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
          Subject Materials - {subject}
        </Typography>
        <hr style={{ border: '2px solid #007bff', margin: '15px 0' }} />

        {/* Materials List */}
        {[1, 2].map((week) => (
          <Box
            key={week}
            sx={{
              marginBottom: '20px',
            }}
          >
            <Typography variant="h6" fontWeight="bold" mb={1}>
              Week 0{week}
            </Typography>
            <Box
              sx={{
                border: '1px dashed gray',
                padding: '20px',
                textAlign: 'center',
                borderRadius: '5px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="body2" sx={{ flex: 1, textAlign: 'left' }}>
                Drag and Drop your file
              </Typography>
              <Button
                variant="contained"
                component="label"
                sx={{ backgroundColor: '#007bff', color: 'white', marginLeft: '10px' }}
              >
                Upload
                <input type="file" hidden />
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: 'red',
                  color: 'white',
                  marginLeft: '10px',
                  padding: '6px 16px',
                }}
              >
                Delete
              </Button>
            </Box>
          </Box>
        ))}

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

export default SubjectMaterials;
