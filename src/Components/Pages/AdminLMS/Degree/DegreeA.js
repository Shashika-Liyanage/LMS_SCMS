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
import { Link } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import AddIcon from '@mui/icons-material/Add';
import AdminSidebar from '../AdminSidebar/AdminSidebar';
import Navbar from '../../../NavBar/Navbar';

const initialCategories = [
  { title: 'Bsc (Hons) in Software Engineering', items: ['Advanced Data Modeling', 'Software Development Practice', 'Mobile Application Development'] },
  { title: 'Bsc (Hons) in Data Science', items: ['Course Work', 'Subject Materials', 'Student Details'] },
  { title: 'Bsc (Hons) in Cyber Security', items: ['Information Security', 'Networking', 'Student Details'] },
  { title: 'Bsc (Hons) in Artificial Intelligence', items: ['Machine Learning', 'Subject Materials', 'Student Details'] },
];

const DegreeA = () => {
  const [openAddModal, setOpenAddModal] = useState(false); // For adding a new category
  const [openDetailsModal, setOpenDetailsModal] = useState(false); // For showing degree course details
  const [openAddSubjectModal, setOpenAddSubjectModal] = useState(false); // For adding a new subject
  const [categories, setCategories] = useState(initialCategories);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newSubjectName, setNewSubjectName] = useState(''); // For adding a new subject
  const [selectedCategory, setSelectedCategory] = useState(null); // To track which category is selected for details
  const [degreeDetails, setDegreeDetails] = useState(''); // Degree course details
  const [selectedCategoryForSubject, setSelectedCategoryForSubject] = useState(null); // To track which category is selected for adding a subject

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

  // Handle opening/closing the "Add Subject" modal
  const handleOpenAddSubjectModal = (category) => {
    setSelectedCategoryForSubject(category); // Set the selected category for adding a subject
    setOpenAddSubjectModal(true);
  };
  const handleCloseAddSubjectModal = () => {
    setOpenAddSubjectModal(false);
    setNewSubjectName('');
  };

  // Add a new category
  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory = { title: newCategoryName, items: [] }; // Empty items array for the new category
      setCategories([...categories, newCategory]);
      handleCloseAddModal();
    }
  };

  // Add a new subject to a category
  const handleAddSubject = () => {
    if (newSubjectName.trim() && selectedCategoryForSubject) {
      const updatedCategories = categories.map((category) =>
        category.title === selectedCategoryForSubject.title
          ? { ...category, items: [...category.items, newSubjectName] }
          : category
      );
      setCategories(updatedCategories);
      handleCloseAddSubjectModal();
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

        {/* Modal for Adding a New Subject */}
        <Modal open={openAddSubjectModal} onClose={handleCloseAddSubjectModal}>
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
              Add New Subject to {selectedCategoryForSubject?.title}
            </Typography>
            <TextField
              fullWidth
              label="Subject Name"
              value={newSubjectName}
              onChange={(e) => setNewSubjectName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              onClick={handleAddSubject}
              sx={{ bgcolor: '#1976D2', color: 'white', '&:hover': { bgcolor: '#125a9e' } }}
            >
              Add Subject
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
                  <Box>
                    <IconButton onClick={() => handleOpenAddSubjectModal(category)}>
                      <AddIcon sx={{ color: '#1976D2' }} /> {/* "+" icon */}
                    </IconButton>
                    <IconButton onClick={() => handleOpenDetailsModal(category)}>
                      <ReportGmailerrorredIcon sx={{ color: '#000000' }} />
                    </IconButton>
                  </Box>
                </Box>

                {/* Display Subjects as a List */}
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
                    <Typography sx={{ fontWeight: 'bold', color: '#333' }}>
                      <Link to={`/degree-subject/${item}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {item}
                      </Link>
                    </Typography>
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