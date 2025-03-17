import React, { useState, useEffect } from 'react';
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
  Snackbar,
  Alert,
} from '@mui/material';
import { Link } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import AddIcon from '@mui/icons-material/Add';
import AdminSidebar from '../AdminSidebar/AdminSidebar';
import Navbar from '../../../NavBar/Navbar';
import { database } from '../../../../Services/Firebase/Firebase-config';
import { ref, push, set, onValue } from 'firebase/database';

const DegreeA = () => {
  const [openAddModal, setOpenAddModal] = useState(false); 
  const [openDetailsModal, setOpenDetailsModal] = useState(false); 
  const [openAddSubjectModal, setOpenAddSubjectModal] = useState(false); 
  const [categories, setCategories] = useState([]); 
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newSubjectName, setNewSubjectName] = useState(''); 
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [degreeDetails, setDegreeDetails] = useState('');
  const [selectedCategoryForSubject, setSelectedCategoryForSubject] = useState(null);

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); 

  // Fetch data from Firebase on component mount
  useEffect(() => {
    const categoriesRef = ref(database, 'categories');
    onValue(categoriesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert Firebase object to an array
        const categoriesArray = Object.keys(data).map((key) => ({
          id: key, // Add a unique ID for each category
          title: data[key].title,
          items: data[key].items ? Object.values(data[key].items) : [],
        }));
        setCategories(categoriesArray);
      } else {
        setCategories([]); 
      }
    });
  }, []);

  // Handle opening/closing the "Add Category" modal
  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => {
    setOpenAddModal(false);
    setNewCategoryName('');
  };

  // Handle opening/closing the "Degree Details" modal
  const handleOpenDetailsModal = (category) => {
    setSelectedCategory(category);
    setDegreeDetails(`Details for ${category.title}`);
    setOpenDetailsModal(true);
  };
  const handleCloseDetailsModal = () => {
    setOpenDetailsModal(false);
    setDegreeDetails('');
  };

  // Handle opening/closing the "Add Subject" modal
  const handleOpenAddSubjectModal = (category) => {
    setSelectedCategoryForSubject(category);
    setOpenAddSubjectModal(true);
  };
  const handleCloseAddSubjectModal = () => {
    setOpenAddSubjectModal(false);
    setNewSubjectName('');
  };

  // Handle Snackbar close
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  // Add a new category to Firebase
  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory = { title: newCategoryName, items: {} }; // Initialize items as an object for Firebase
      const categoryRef = ref(database, 'categories'); // Reference to the 'categories' node in Firebase
      const newCategoryRef = push(categoryRef); // Push a new category to Firebase
      set(newCategoryRef, newCategory); // Set the data for the new category
      handleCloseAddModal();

      // Show Snackbar
      setSnackbarMessage('Category added successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    }
  };

  // Add a new subject to a category in Firebase
  const handleAddSubject = () => {
    if (newSubjectName.trim() && selectedCategoryForSubject) {
      const updatedCategories = categories.map((category) =>
        category.id === selectedCategoryForSubject.id
          ? { ...category, items: [...(category.items || []), newSubjectName] } // Ensure items is an array
          : category
      );
      setCategories(updatedCategories);

      // Update Firebase with the new subject
      const categoryRef = ref(database, `categories/${selectedCategoryForSubject.id}/items`);
      push(categoryRef, newSubjectName); // Push the new subject to Firebase

      handleCloseAddSubjectModal();

      // Show Snackbar
      setSnackbarMessage('Subject added successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
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
                      <AddIcon sx={{ color: '#1976D2' }} />
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
                      <Link to={`/degree-subject/${encodeURIComponent(item)}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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

      {/* Snackbar for Success Messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000} // Auto-close after 3 seconds
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Position at top-right
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default DegreeA;