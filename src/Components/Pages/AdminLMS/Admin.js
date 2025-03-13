import React from 'react'
import AdminSidebar from './AdminSidebar/AdminSidebar'
import Navbar from '../../NavBar/Navbar'
import { Box, Grid, Typography, Button, Paper } from '@mui/material';

function Admin() {
  return (
    <>
    <AdminSidebar/>
    <Navbar/>

    <Box sx={{ flexGrow: 1, padding: 3, marginLeft: '250px' }}>

    <Typography variant="h4" gutterBottom>
        Home
      </Typography>

        {/* Grid Container */}
        <Grid container spacing={3}>
          {/* CERTIFICATE */}
          <Grid item xs={12} sm={6} md={6}>
            <Paper
              elevation={3}
              sx={{
                padding: 3,
                textAlign: 'center',
                backgroundColor: '#f5f5f5', // Light gray background
                '&:hover': { backgroundColor: '#e0e0e0' }, // Hover effect
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                CERTIFICATE
              </Typography>
              <Button
                variant="contained"
                sx={{ backgroundColor: '#1976d2', color: '#fff' }} // Custom button style
              >
                View Details
              </Button>
            </Paper>
          </Grid>

          {/* DIPLOMA */}
          <Grid item xs={12} sm={6} md={6}>
            <Paper
              elevation={3}
              sx={{
                padding: 3,
                textAlign: 'center',
                backgroundColor: '#f5f5f5', // Light gray background
                '&:hover': { backgroundColor: '#e0e0e0' }, // Hover effect
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                DIPLOMA
              </Typography>
              <Button
                variant="contained"
                sx={{ backgroundColor: '#1976d2', color: '#fff' }} // Custom button style
              >
                View Details
              </Button>
            </Paper>
          </Grid>

          {/* HND */}
          <Grid item xs={12} sm={6} md={6}>
            <Paper
              elevation={3}
              sx={{
                padding: 3,
                textAlign: 'center',
                backgroundColor: '#f5f5f5', // Light gray background
                '&:hover': { backgroundColor: '#e0e0e0' }, // Hover effect
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                HND
              </Typography>
              <Button
                variant="contained"
                sx={{ backgroundColor: '#1976d2', color: '#fff' }} // Custom button style
              >
                View Details
              </Button>
            </Paper>
          </Grid>

          {/* DEGREE */}
          <Grid item xs={12} sm={6} md={6}>
            <Paper
              elevation={3}
              sx={{
                padding: 3,
                textAlign: 'center',
                backgroundColor: '#f5f5f5', // Light gray background
                '&:hover': { backgroundColor: '#e0e0e0' }, // Hover effect
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                DEGREE
              </Typography>
              <Button
                variant="contained"
                sx={{ backgroundColor: '#1976d2', color: '#fff' }} // Custom button style
              >
                View Details
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Admin