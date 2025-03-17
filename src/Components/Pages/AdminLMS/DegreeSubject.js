import React from "react";
import { Box, Typography, Button, Link, Alert, Snackbar } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

const DegreeSubject = ({ onRemoveSubject }) => {
  const { subjectName } = useParams(); // Get the subjectName from the URL
  const navigate = useNavigate(); // Use navigate to redirect

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("success");

  // Handle Snackbar close
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  // Handle Remove Subject (Only UI Removal)
  const handleRemoveSubject = () => {
    try {
      // Show success message
      setSnackbarMessage("Subject removed from UI successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      // Call the callback function to remove the subject from the parent's state
      onRemoveSubject(subjectName);

      // Navigate back to the DegreeA page after 2 seconds
      setTimeout(() => {
        navigate("/admin/degreeAdmin"); // Replace with the correct path to DegreeA
      }, 2000);
    } catch (error) {
      // Show error message
      setSnackbarMessage("Failed to remove subject from UI. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      console.error("Error removing subject from UI:", error);
    }
  };

  return (
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
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, alignSelf: "flex-start", ml: 3 }}>
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
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2 }}>
          {/* Left Section: Coursework */}
          <Box sx={{ flex: 1, bgcolor: "white", p: 3, boxShadow: 3, borderRadius: 2 }}>
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

            <Box sx={{ bgcolor: "#f1f1f1", p: 2, borderRadius: 2, boxShadow: 1 }}>
              <Typography fontWeight="bold" sx={{ mb: 1 }}>Course Work 02</Typography>
              <Typography fontSize={14}>
                Please note that {decodeURIComponent(subjectName)} coursework 2 is issued as a "Draft Coursework and is Subject to
                Moderation." Please submit the coursework on or before 30th March 2025 before 3:55 p.m. via ELMS.
              </Typography>
              <Typography fontSize={14} sx={{ mt: 1 }}><strong>Submission Time:</strong> 30/03/2025 15:55</Typography>
              <Typography fontSize={14}><strong>Marks Release Time:</strong> 14/05/2025 10:29</Typography>
              <Typography fontWeight="bold" sx={{ mt: 1 }}>Resource:</Typography>
              <Link href="#" color="primary">Word - Document</Link>
            </Box>
          </Box>

          {/* Right Section: Subject Materials */}
          <Box sx={{ flex: 1, bgcolor: "white", p: 3, boxShadow: 3, borderRadius: 2 }}>
            <Typography fontWeight="bold" sx={{ mb: 2 }}>Subject Materials</Typography>
            <Box sx={{ bgcolor: "#f1f1f1", p: 2, borderRadius: 2, boxShadow: 1 }}>
              <Typography
                fontSize={14}
                sx={{ borderBottom: "1px solid #1976D2", py: 1, display: 'flex', justifyContent: 'space-between' }}
              >
                Week 01 <Link href="#" color="primary">Uploaded</Link>
              </Typography>
              <Typography
                fontSize={14}
                sx={{ borderBottom: "1px solid #1976D2", py: 1, display: 'flex', justifyContent: 'space-between' }}
              >
                Week 02 <Link href="#" color="primary">Uploaded</Link>
              </Typography>
              <Typography
                fontSize={14}
                sx={{ borderBottom: "1px solid #1976D2", py: 1, display: 'flex', justifyContent: 'space-between' }}
              >
                Week 03 <Typography component="span" sx={{ color: "#F29339" }}>Pending</Typography>
              </Typography>
              <Typography
                fontSize={14}
                sx={{ borderBottom: "1px solid #1976D2", py: 1, display: 'flex', justifyContent: 'space-between' }}
              >
                Week 04 <Typography component="span" sx={{ color: "#F29339" }}>Pending</Typography>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Remove Button positioned at the top-right corner of the page */}
      <Box sx={{ position: "fixed", top: 630, right: 20, zIndex: 1000 }}>
        <Button
          variant="contained"
          color="error"
          sx={{ borderRadius: 2 }}
          onClick={handleRemoveSubject} // Call handleRemoveSubject on click
        >
          Remove Subject
        </Button>
      </Box>

      {/* Snackbar for Success/Error Messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000} // Auto-close after 3 seconds
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }} // Position at top-right
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DegreeSubject;