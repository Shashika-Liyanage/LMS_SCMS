import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Link,
  Alert,
  Snackbar,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Grid,
} from "@mui/material";
import Navbar from "../NavBar/Navbar";
import StudentSidebar from '../../Components/Pages/Student/StudentSidebar/StudentSidebar';

const CourseMaterials = ({ subjectName = "Default Subject" }) => {
  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Upload dialog state
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);

  // Download dialog state
  const [downloadDialogOpen, setDownloadDialogOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // Handle Snackbar close
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  // Handle Upload Dialog Open
  const handleUploadDialogOpen = () => {
    setUploadDialogOpen(true);
  };

  // Handle Upload Dialog Close
  const handleUploadDialogClose = () => {
    setUploadDialogOpen(false);
    setFile(null); // Reset file input
  };

  // Handle File Change
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Handle File Upload
  const handleFileUpload = () => {
    if (!file) {
      setSnackbarMessage("Please select a file to upload.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    setUploading(true);

    // Simulate file upload (replace with actual API call)
    setTimeout(() => {
      setUploading(false);
      setSnackbarMessage("File uploaded successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setUploadDialogOpen(false);
      setFile(null); // Reset file input
    }, 2000);
  };

  // Handle Download Dialog Open
  const handleDownloadDialogOpen = () => {
    setDownloadDialogOpen(true);
  };

  // Handle Download Dialog Close
  const handleDownloadDialogClose = () => {
    setDownloadDialogOpen(false);
  };

  // Handle File Download
  const handleFileDownload = () => {
    setDownloading(true);

    // Simulate file download (replace with actual API call)
    setTimeout(() => {
      setDownloading(false);
      setSnackbarMessage("File downloaded successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setDownloadDialogOpen(false);
    }, 2000);
  };

  return (
    <>
      <Navbar />
      <StudentSidebar />
      <Box
        sx={{
          padding: 3,
          bgcolor: "#f8f9fb",
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Title outside the box */}
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, alignSelf: "flex-start", ml: 3, marginLeft: '250px' }}>
          {decodeURIComponent(subjectName)} {/* Decode the subject name */}
        </Typography>

        {/* Main content container */}
        <Box
          sx={{
            width: "90%",
            maxWidth: 900,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            position: "relative",
          }}
        >
          {/* Coursework and Subject Materials in 1:1 Grid Layout */}
          <Grid container spacing={2}>
            {/* Left Section: Coursework */}
            <Grid item xs={12} md={6}>
              <Box sx={{ bgcolor: "white", p: 3, boxShadow: 3, borderRadius: 2, height: '100%' }}>
                <Typography fontWeight="bold" sx={{ mb: 2 }}>Coursework</Typography>
                <Box sx={{ bgcolor: "#f1f1f1", p: 2, borderRadius: 2, boxShadow: 1, mb: 2 }}>
                  <Typography fontWeight="bold" sx={{ mb: 1 }}>Course Work 01</Typography>
                  <Typography fontSize={14}>
                    Please note that {decodeURIComponent(subjectName)} coursework 1 is issued as a "Draft Coursework and is Subject to
                    Moderation." Please submit the coursework on or before 30th March 2025 before 3:55 p.m. via ELMS.
                  </Typography>
                  <Typography fontSize={14} sx={{ mt: 1 }}><strong>Submission Time:</strong> 30/03/2025 15:55</Typography>
                  <Typography fontSize={14}><strong>Marks Release Time:</strong> 14/05/2025 10:29</Typography>
                  <Typography fontWeight="bold" sx={{ mt: 1 }}>Resource:</Typography>
                  <Link href="#" color="primary">Word - Document</Link>
                </Box>
              </Box>
            </Grid>

            {/* Right Section: Subject Materials */}
            <Grid item xs={12} md={6}>
              <Box sx={{ bgcolor: "white", p: 3, boxShadow: 3, borderRadius: 2, height: '100%' }}>
                <Typography fontWeight="bold" sx={{ mb: 2 }}>Subject Materials</Typography>
                <Box sx={{ bgcolor: "#f1f1f1", p: 2, borderRadius: 2, boxShadow: 1 }}>
                  {[1, 2, 3, 4, 5, 6].map((week) => (
                    <Typography
                      key={week}
                      fontSize={14}
                      sx={{ borderBottom: "1px solid #1976D2", py: 1, display: 'flex', justifyContent: 'space-between' }}
                    >
                      Week {week} <Link href="#" color="primary" onClick={handleDownloadDialogOpen}>Download</Link>
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>

          {/* Uploads for Coursework Section */}
          <Box sx={{ bgcolor: "white", p: 3, boxShadow: 3, borderRadius: 2, marginTop: "50px" }}>
            <Typography fontWeight="bold" sx={{ mb: 2 }}>Uploads for Coursework</Typography>
            <Box sx={{ bgcolor: "#f1f1f1", p: 2, borderRadius: 2, boxShadow: 1 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUploadDialogOpen}
              >
                Upload Document
              </Button>
            </Box>
          </Box>

          {/* Communication Section */}
          <Box sx={{ bgcolor: "white", p: 3, boxShadow: 3, borderRadius: 2, marginTop: "5px"}}>
            <Typography fontWeight="bold" sx={{ mb: 2 }}>Communication</Typography>
            <Box sx={{ bgcolor: "#f1f1f1", p: 2, borderRadius: 2, boxShadow: 1 }}>
              <TextField
                fullWidth
                placeholder="Type message..."
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button variant="contained" color="primary">Send</Button>
                <Button variant="outlined" color="secondary">Clear</Button>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Upload Dialog */}
        <Dialog open={uploadDialogOpen} onClose={handleUploadDialogClose}>
          <DialogTitle>Upload Coursework Document</DialogTitle>
          <DialogContent>
            <Typography sx={{ mb: 2 }}>
              Please select a file to upload. Supported formats: PDF, DOC, DOCX.
            </Typography>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              disabled={uploading}
              style={{ marginBottom: '16px' }}
            />
            {uploading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <CircularProgress />
                <Typography sx={{ ml: 2 }}>Uploading...</Typography>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleUploadDialogClose} disabled={uploading}>
              Cancel
            </Button>
            <Button onClick={handleFileUpload} disabled={uploading}>
              Upload
            </Button>
          </DialogActions>
        </Dialog>

        {/* Download Dialog */}
        <Dialog open={downloadDialogOpen} onClose={handleDownloadDialogClose}>
          <DialogTitle>Download File</DialogTitle>
          <DialogContent>
            {downloading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <CircularProgress />
                <Typography sx={{ ml: 2 }}>Downloading...</Typography>
              </Box>
            ) : (
              <Typography>Are you sure you want to download this file?</Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDownloadDialogClose} disabled={downloading}>
              Cancel
            </Button>
            <Button onClick={handleFileDownload} disabled={downloading}>
              Download
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for Success/Error Messages */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default CourseMaterials;