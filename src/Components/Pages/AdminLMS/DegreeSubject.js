import React from "react";
import {
  Box,
  Typography,
  Button,
  Link,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { database } from "../../../Services/Firebase/Firebase-config";
import { ref, remove } from "firebase/database";
import EditIcon from "@mui/icons-material/Edit"; // Import Edit icon

const DegreeSubject = () => {
  const { subjectName } = useParams();
  const navigate = useNavigate();

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("success");

  // Popup state for updating Coursework 1 and Coursework 2
  const [updatePopupOpen, setUpdatePopupOpen] = React.useState(false);
  const [currentCoursework, setCurrentCoursework] = React.useState("coursework1"); // Track which coursework is being updated
  const [coursework1Details, setCoursework1Details] = React.useState({
    description:
      "Please note that {subjectName} coursework 1 is issued as a 'Draft Coursework and is Subject to Moderation.' Please submit the coursework on or before 30th March 2025 before 3:55 p.m. via ELMS.",
    submissionTime: "30/03/2025 15:55",
    marksReleaseTime: "14/05/2025 10:29",
    resourceLink: "#",
  });
  const [coursework2Details, setCoursework2Details] = React.useState({
    description:
      "Please note that {subjectName} coursework 2 is issued as a 'Draft Coursework and is Subject to Moderation.' Please submit the coursework on or before 30th March 2025 before 3:55 p.m. via ELMS.",
    submissionTime: "30/03/2025 15:55",
    marksReleaseTime: "14/05/2025 10:29",
    
  });

  // Handle Snackbar close
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  // Handle Remove Subject
  const handleRemoveSubject = async () => {
    try {
      const subjectRef = ref(database, `categories/${subjectName}`);
      await remove(subjectRef);

      setSnackbarMessage("Subject removed successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      setTimeout(() => {
        navigate("/admin/degreeAdmin");
      }, 2000);
    } catch (error) {
      setSnackbarMessage("Failed to remove subject. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      console.error("Error removing subject:", error);
    }
  };

  // Handle Update Popup Open
  const handleUpdatePopupOpen = (coursework) => {
    setCurrentCoursework(coursework); // Set which coursework is being updated
    setUpdatePopupOpen(true);
  };

  // Handle Update Popup Close
  const handleUpdatePopupClose = () => {
    setUpdatePopupOpen(false);
  };

  // Handle Update Coursework Details
  const handleUpdateCoursework = () => {
    if (currentCoursework === "coursework1") {
      // Update Coursework 1 details
      setSnackbarMessage("Coursework 1 details updated successfully!");
    } else if (currentCoursework === "coursework2") {
      // Update Coursework 2 details
      setSnackbarMessage("Coursework 2 details updated successfully!");
    }
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
    handleUpdatePopupClose();
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
        {decodeURIComponent(subjectName)}
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
            <Typography fontWeight="bold" sx={{ mb: 2 }}>
              Coursework
            </Typography>

            {/* Coursework 1 Box */}
            <Box sx={{ bgcolor: "#f1f1f1", p: 2, borderRadius: 2, boxShadow: 1, mb: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography fontWeight="bold" sx={{ mb: 1 }}>
                  Course Work 01
                </Typography>
                <IconButton onClick={() => handleUpdatePopupOpen("coursework1")} size="small">
                  <EditIcon fontSize="small" />
                </IconButton>
              </Box>
              <Typography fontSize={14}>{coursework1Details.description}</Typography>
              <Typography fontSize={14} sx={{ mt: 1 }}>
                <strong>Submission Time:</strong> {coursework1Details.submissionTime}
              </Typography>
              <Typography fontSize={14}>
                <strong>Marks Release Time:</strong> {coursework1Details.marksReleaseTime}
              </Typography>
              <Typography fontWeight="bold" sx={{ mt: 1 }}>
                Resource:
              </Typography>
              <Link href={coursework1Details.resourceLink} color="primary">
                Word - Document
              </Link>
            </Box>

            {/* Coursework 2 Box */}
            <Box sx={{ bgcolor: "#f1f1f1", p: 2, borderRadius: 2, boxShadow: 1 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography fontWeight="bold" sx={{ mb: 1 }}>
                  Course Work 02
                </Typography>
                <IconButton onClick={() => handleUpdatePopupOpen("coursework2")} size="small">
                  <EditIcon fontSize="small" />
                </IconButton>
              </Box>
              <Typography fontSize={14}>{coursework2Details.description}</Typography>
              <Typography fontSize={14} sx={{ mt: 1 }}>
                <strong>Submission Time:</strong> {coursework2Details.submissionTime}
              </Typography>
              <Typography fontSize={14}>
                <strong>Marks Release Time:</strong> {coursework2Details.marksReleaseTime}
              </Typography>
              <Typography fontWeight="bold" sx={{ mt: 1 }}>
                Resource:
              </Typography>
              <Link href={coursework2Details.resourceLink} color="primary">
                Word - Document
              </Link>
            </Box>
          </Box>

          {/* Right Section: Subject Materials */}
          <Box sx={{ flex: 1, bgcolor: "white", p: 3, boxShadow: 3, borderRadius: 2 }}>
            <Typography fontWeight="bold" sx={{ mb: 2 }}>
              Subject Materials
            </Typography>
            <Box sx={{ bgcolor: "#f1f1f1", p: 2, borderRadius: 2, boxShadow: 1 }}>
              <Typography
                fontSize={14}
                sx={{ borderBottom: "1px solid #1976D2", py: 1, display: "flex", justifyContent: "space-between" }}
              >
                Week 01 <Link href="#" color="primary">Uploaded</Link>
              </Typography>
              <Typography
                fontSize={14}
                sx={{ borderBottom: "1px solid #1976D2", py: 1, display: "flex", justifyContent: "space-between" }}
              >
                Week 02 <Link href="#" color="primary">Uploaded</Link>
              </Typography>
              <Typography
                fontSize={14}
                sx={{ borderBottom: "1px solid #1976D2", py: 1, display: "flex", justifyContent: "space-between" }}
              >
                Week 03 <Typography component="span" sx={{ color: "#F29339" }}>Pending</Typography>
              </Typography>
              <Typography
                fontSize={14}
                sx={{ borderBottom: "1px solid #1976D2", py: 1, display: "flex", justifyContent: "space-between" }}
              >
                Week 04 <Typography component="span" sx={{ color: "#F29339" }}>Pending</Typography>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Remove Button positioned at the top-right corner of the page */}
      <Box sx={{ position: "fixed", top: 630, right: 20, zIndex: 1000 }}>
        <Button variant="contained" color="error" sx={{ borderRadius: 2 }} onClick={handleRemoveSubject}>
          Remove Subject
        </Button>
      </Box>

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

      {/* Popup for Updating Coursework Details */}
      <Dialog open={updatePopupOpen} onClose={handleUpdatePopupClose}>
        <DialogTitle>
          Update {currentCoursework === "coursework1" ? "Coursework 1" : "Coursework 2"} Details
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={
              currentCoursework === "coursework1"
                ? coursework1Details.description
                : coursework2Details.description
            }
            onChange={(e) =>
              currentCoursework === "coursework1"
                ? setCoursework1Details({ ...coursework1Details, description: e.target.value })
                : setCoursework2Details({ ...coursework2Details, description: e.target.value })
            }
            sx={{ mt: 2 }}
          />
          <TextField
            label="Submission Time"
            fullWidth
            value={
              currentCoursework === "coursework1"
                ? coursework1Details.submissionTime
                : coursework2Details.submissionTime
            }
            onChange={(e) =>
              currentCoursework === "coursework1"
                ? setCoursework1Details({ ...coursework1Details, submissionTime: e.target.value })
                : setCoursework2Details({ ...coursework2Details, submissionTime: e.target.value })
            }
            sx={{ mt: 2 }}
          />
          <TextField
            label="Marks Release Time"
            fullWidth
            value={
              currentCoursework === "coursework1"
                ? coursework1Details.marksReleaseTime
                : coursework2Details.marksReleaseTime
            }
            onChange={(e) =>
              currentCoursework === "coursework1"
                ? setCoursework1Details({ ...coursework1Details, marksReleaseTime: e.target.value })
                : setCoursework2Details({ ...coursework2Details, marksReleaseTime: e.target.value })
            }
            sx={{ mt: 2 }}
          />
        
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdatePopupClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleUpdateCoursework}
            color="primary"
            sx={{
              backgroundColor: "#1976D2",
              color: "white",
              "&:hover": { backgroundColor: "#1565C0" },
            }}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DegreeSubject;