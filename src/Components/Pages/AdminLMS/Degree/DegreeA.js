import React from 'react';
import { Box, Button, Typography, IconButton, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AdminSidebar from '../AdminSidebar/AdminSidebar';
import Navbar from '../../../NavBar/Navbar';

const categories = [
  { title: 'Software Engineering', items: ['Course Work', 'Subject Materials', 'Student Details'] },
  { title: 'Data Science', items: ['Course Work', 'Subject Materials', 'Student Details'] },
  { title: 'Cyber Security', items: ['Course Work', 'Subject Materials', 'Student Details'] },
  { title: 'Artificial Intelligence', items: ['Course Work', 'Subject Materials', 'Student Details'] },
];

const DegreeA = () => {
  return (
    <>
      <AdminSidebar />
      <Navbar />
      
      <Box sx={{ marginLeft: '250px', marginRight:'40px', p: 2, bgcolor: 'white', minHeight: '80vh' }}>
        
        {/* Add Category Button in the Top Right */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            sx={{ bgcolor: '#1976D2', color: 'white', '&:hover': { bgcolor: '#125a9e' } }}
          >
            Add Category
          </Button>
        </Box>

        {/* Responsive Grid for Categories */}
        <Grid container spacing={6}>
          {categories.map((category, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Box sx={{ bgcolor: '#f4f6f8', p: 2, borderRadius: 2, boxShadow: 2 }}>
                <Typography sx={{ fontWeight: 'bold', color: '#1976D2', mb: 1 }}>{category.title}</Typography>
                
                {category.items.map((item, subIndex) => (
                  <Box key={subIndex} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1, borderBottom: '2px solid #1976D2' }}>
                    <Typography sx={{ fontWeight: 'bold', color: '#333' }}>{item}</Typography>
                    <Box>
                      <IconButton size="small">
                        <AddIcon sx={{ color: '#1976D2' }} />
                      </IconButton>
                      <IconButton size="small">
                        <EditIcon sx={{ color: '#1976D2' }} />
                      </IconButton>
                      <IconButton size="small">
                        <DeleteIcon sx={{ color: '#d32f2f' }} />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>

      </Box>
    </>
  );
};

export default DegreeA;
