import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  IconButton,
  Grid,
  Modal,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import AdminSidebar from '../AdminSidebar/AdminSidebar';
import Navbar from '../../../NavBar/Navbar';

const initialCategories = [
  { title: 'Software Engineering', items: ['Course Work', 'Subject Materials', 'Student Details'] },
  { title: 'Data Science', items: ['Course Work', 'Subject Materials', 'Student Details'] },
  { title: 'Cyber Security', items: ['Course Work', 'Subject Materials', 'Student Details'] },
  { title: 'Artificial Intelligence', items: ['Course Work', 'Subject Materials', 'Student Details'] },
];

const DegreeA = () => {
  const [openAddModal, setOpenAddModal] = useState(false); // For adding a new category
  const [openDetailsModal, setOpenDetailsModal] = useState(false); // For showing degree course details
  const [categories, setCategories] = useState(initialCategories);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null); // To track which category is selected for details
  const [degreeDetails, setDegreeDetails] = useState(''); // Degree course details

  // Handle opening/closing the "Add Category" modal
  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => {
    setOpenAddModal(false);
    setNewCategoryName('');
  };

  // Handle opening/closing the "Degree Details" modal
  const handleOpenDetailsModal = (category) => {
    setSelectedCategory(category);
    setDegreeDetails(`Details for ${category.title}`); // Default details (can be customized)
    setOpenDetailsModal(true);
  };
  const handleCloseDetailsModal = () => {
    setOpenDetailsModal(false);
    setDegreeDetails('');
  };

  // Add a new category
  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory = { title: newCategoryName, items: ['Course Work', 'Subject Materials', 'Student Details'] };
      setCategories([...categories, newCategory]);
      handleCloseAddModal();
    }
  };

  // Save degree course details
  const handleSaveDetails = () => {
    alert(`Details saved for ${selectedCategory.title}: ${degreeDetails}`);
    handleCloseDetailsModal();
  };

  return (
    <>
      <AdminSidebar />
      <Navbar />

      <Box sx={{ marginLeft: '250px', marginRight: '40px', p: 2, bgcolor: 'white', minHeight: '80vh' }}>
        {/* Add Category Button in the Top Right */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            sx={{ bgcolor: '#1976D2', color: 'white', '&:hover': { bgcolor: '#125a9e' } }}
            onClick={handleOpenAddModal}
          >
            Add Category
          </Button>
        </Box>

        {/* Modal for Adding a New Category */}
        <Modal open={openAddModal} onClose={handleCloseAddModal}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', color: '#1976D2', mb: 2 }}>
              Add New Category
            </Typography>
            <TextField
              fullWidth
              label="Category Name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              onClick={handleAddCategory}
              sx={{ bgcolor: '#1976D2', color: 'white', '&:hover': { bgcolor: '#125a9e' } }}
            >
              Add
            </Button>
          </Box>
        </Modal>

        {/* Modal for Degree Course Details */}
        <Dialog open={openDetailsModal} onClose={handleCloseDetailsModal} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ bgcolor: '#1976D2', color: 'white', fontWeight: 'bold' }}>
            Degree Course Details: {selectedCategory?.title}
          </DialogTitle>
          <DialogContent sx={{ mt: 2 }}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Degree Details"
              value={degreeDetails}
              onChange={(e) => setDegreeDetails(e.target.value)}
              sx={{ mb: 1, marginTop: '8px' }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDetailsModal} sx={{ color: '#d32f2f' }}>
              Cancel
            </Button>
            <Button onClick={handleSaveDetails} sx={{ bgcolor: '#1976D2', color: 'white' }}>
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Responsive Grid for Categories */}
        <Grid container spacing={6}>
          {categories.map((category, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Box sx={{ bgcolor: '#f4f6f8', p: 2, borderRadius: 2, boxShadow: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography sx={{ fontWeight: 'bold', color: '#1976D2', mb: 1 }}>{category.title}</Typography>
                  <IconButton onClick={() => handleOpenDetailsModal(category)}>
                    <ReportGmailerrorredIcon sx={{ color: '#000000' }} />
                  </IconButton>
                </Box>

                {category.items.map((item, subIndex) => (
                  <Box
                    key={subIndex}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      py: 1,
                      borderBottom: '2px solid #1976D2',
                    }}
                  >
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