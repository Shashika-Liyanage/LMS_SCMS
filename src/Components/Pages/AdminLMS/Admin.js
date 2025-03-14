import React from 'react'
import AdminSidebar from './AdminSidebar/AdminSidebar'
import Navbar from '../../NavBar/Navbar'
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Typography } from '@mui/material';

function Admin() {
  const navigate = useNavigate(); 
  return (
    <>
    <AdminSidebar/>
    <Navbar/>
    

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
        <Grid container spacing={3} sx={{ maxWidth: 600 }}>  {/* Increased spacing for gap */}
          {/* Certificate */}
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                backgroundColor: '#83C1E9',
                padding: '40px',
                textAlign: 'center',
                borderRadius: '8px',
                boxShadow: 2,
              }}
            >
              <Typography fontWeight="bold">Certificate</Typography>
            </Box>
          </Grid>

          {/* Diploma */}
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                backgroundColor: '#83C1E9',
                padding: '40px',
                textAlign: 'center',
                borderRadius: '8px',
                boxShadow: 2,
              }}
            >
              <Typography fontWeight="bold">Diploma</Typography>
            </Box>
          </Grid>

          {/* HND */}
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                backgroundColor: '#83C1E9',
                padding: '40px',
                textAlign: 'center',
                borderRadius: '8px',
                boxShadow: 2,
              }}
            >
              <Typography fontWeight="bold">HND</Typography>
            </Box>
          </Grid>

          {/* Degree */}
          <Grid item xs={12} sm={6}>
            <Box
             onClick={() => navigate('degreeAdmin')}
              sx={{
                backgroundColor: '#83C1E9',
                padding: '40px',
                textAlign: 'center',
                borderRadius: '8px',
                boxShadow: 2,
              }}
            >
              <Typography fontWeight="bold">Degree</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
   
    </>
  )
}

export default Admin