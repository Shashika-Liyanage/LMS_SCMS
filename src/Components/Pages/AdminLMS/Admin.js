import React from 'react'
import AdminSidebar from './AdminSidebar/AdminSidebar'
import Navbar from '../../NavBar/Navbar'
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Typography, IconButton } from '@mui/material';
import { Book, Badge, Assignment, SchoolOutlined } from '@mui/icons-material'; // Updated MUI icons

function Admin() {
  const navigate = useNavigate(); 

  return (
    <>
      <AdminSidebar />
      <Navbar />

      {/* Main Content Area */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
          ml: { md: '240px' }, // Adjust for sidebar
          mt: { xs: '80px', md: '0px' }, // Space for navbar
          px: { xs: 2, sm: 4 }, // Add padding on small screens
        }}
      >
        <Grid container spacing={3} sx={{ maxWidth: 800 }}>  {/* Increased spacing for gap */}
          
          {/* Certificate */}
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                backgroundColor: '#60A5FA', // Lighter blue background
                padding: '40px',
                textAlign: 'center',
                borderRadius: '12px',
                boxShadow: 3,
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: 6,
                },
              }}
            >
              <IconButton sx={{ fontSize: '80px', color: '#fff', marginBottom: '15px' }}>
                <Assignment />  {/* Changed to Assignment icon */}
              </IconButton>
              <Typography variant="h5" sx={{ color: '#fff', fontWeight: 'bold' }}>Certificate</Typography>
              <Typography sx={{ color: '#fff', fontSize: '16px' }}>
                Awarded upon successful completion.
              </Typography>
            </Box>
          </Grid>

          {/* Diploma */}
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                backgroundColor: '#60A5FA', // Lighter blue background
                padding: '40px',
                textAlign: 'center',
                borderRadius: '12px',
                boxShadow: 3,
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: 6,
                },
              }}
            >
              <IconButton sx={{ fontSize: '80px', color: '#fff', marginBottom: '15px' }}>
                <Book />
              </IconButton>
              <Typography variant="h5" sx={{ color: '#fff', fontWeight: 'bold' }}>Diploma</Typography>
              <Typography sx={{ color: '#fff', fontSize: '16px' }}>
                Provides a foundation in specialized subjects.
              </Typography>
            </Box>
          </Grid>

          {/* HND */}
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                backgroundColor: '#60A5FA', // Lighter blue background
                padding: '40px',
                textAlign: 'center',
                borderRadius: '12px',
                boxShadow: 3,
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: 6,
                },
              }}
            >
              <IconButton sx={{ fontSize: '80px', color: '#fff', marginBottom: '15px' }}>
                <Badge />
              </IconButton>
              <Typography variant="h5" sx={{ color: '#fff', fontWeight: 'bold' }}>HND</Typography>
              <Typography sx={{ color: '#fff', fontSize: '16px' }}>
                Higher National Diploma for advanced knowledge and skills.
              </Typography>
            </Box>
          </Grid>

          {/* Degree */}
          <Grid item xs={12} sm={6}>
            <Box
              onClick={() => navigate('degreeAdmin')}
              sx={{
                backgroundColor: '#60A5FA', // Lighter blue background
                padding: '40px',
                textAlign: 'center',
                borderRadius: '12px',
                boxShadow: 3,
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: 6,
                },
              }}
            >
              <IconButton sx={{ fontSize: '80px', color: '#fff', marginBottom: '15px' }}>
                <SchoolOutlined />  {/* Changed to SchoolOutlined icon */}
              </IconButton>
              <Typography variant="h5" sx={{ color: '#fff', fontWeight: 'bold' }}>Degree</Typography>
              <Typography sx={{ color: '#fff', fontSize: '16px' }}>
                Undergraduate studies leading to a professional career.
              </Typography>
            </Box>
          </Grid>

        </Grid>
      </Box>
    </>
  );
}

export default Admin;
