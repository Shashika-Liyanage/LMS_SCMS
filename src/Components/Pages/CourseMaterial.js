import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

const CourseMaterials = () => {


  // Course data
  const course = {
    title: "Advance Data Modelling",
    upcomingAssignments: [
      {
        assignment: "C16:32.0 - Advanced Dat...",
        deadline: "30/03/2025 15:55",
      },
    ],
    materials: [
      { week: "Week 1", learningOutcome: "LO1", fileUrl: "https://example.com/week1.pdf" },
      { week: "Week 2", learningOutcome: "LO2", fileUrl: "https://example.com/week2.pdf" },
      { week: "Week 3", learningOutcome: "LO3", fileUrl: "https://example.com/week3.pdf" },
    ],
  };

  // State for controlling the pop-up dialog
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(""); 

  // Handle sending a new message
const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { sender: "You", text: newMessage }]);
      setNewMessage("");
    }
  };

  // Handle opening the pop-up dialog
  const handleOpenDialog = (material) => {
    setSelectedMaterial(material);
    setOpenDialog(true);
  };

  // Handle closing the pop-up dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Handle downloading the lecture material
  const handleDownload = () => {
    if (selectedMaterial) {
      window.open(selectedMaterial.fileUrl, "_blank"); // Open the file URL in a new tab
      handleCloseDialog(); // Close the dialog after download
    }
  };

  // Handle opening the upload permission pop-up dialog
  const handleOpenUploadDialog = () => {
    setOpenUploadDialog(true);
  };

  // Handle closing the upload permission pop-up dialog
  const handleCloseUploadDialog = () => {
    setOpenUploadDialog(false);
  };

  // Handle uploading the assignment
  const handleUpload = () => {
    console.log("Assignment uploaded!");
    handleCloseUploadDialog(); // Close the dialog after upload
  };

  return (
    <Box sx={{ padding: 3 }}>
      {/* Course Title */}
      <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        {course.title}
      </Typography>

      {/* Upcoming Assignments */}
      <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        Upcoming Assignments
      </Typography>
      <Paper elevation={3} 
      sx={{ padding: 2, 
            marginBottom: 4,
            cursor: "pointer", // Add pointer cursor
          "&:hover": {
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)", // Add hover effect
          },
        }}
        onClick={handleOpenUploadDialog}
        >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Assignment
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Deadline
            </Typography>
          </Grid>
          {course.upcomingAssignments.map((event, index) => (
            <React.Fragment key={index}>
              <Grid item xs={6}>
                <Typography variant="body1">{event.assignment}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">{event.deadline}</Typography>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Paper>

      {/* All Materials */}
      <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        All Materials
      </Typography>
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 4 }}>
        <List>
          {course.materials.map((material, index) => (
            <ListItem
              key={index}
              button
              onClick={() => handleOpenDialog(material)} // Open pop-up on click
              sx={{
                "&:hover": {
                  backgroundColor: "#f5f5f5", // Add hover effect
                  transform: "scale(1.02)", // Slight zoom effect
                  transition: "transform 0.2s ease-in-out", // Smooth transition
                },
                borderRadius: "8px", // Rounded corners
                marginBottom: "8px", // Spacing between items
              }}
            >
              <ListItemText
                primary={`${material.week}: ${material.learningOutcome}`}
                primaryTypographyProps={{ fontWeight: "bold" }} // Bold text
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Communication Section */}
<Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
  Communication
</Typography>
<Paper elevation={3} sx={{ padding: 2, marginBottom: 4 }}>
  <Box sx={{ height: "200px", overflowY: "auto", marginBottom: 2 }}>
    <List>
      {messages.map((message, index) => (
        <ListItem key={index}>
          <ListItemText
            primary={`${message.sender}: ${message.text}`}
          />
        </ListItem>
      ))}
    </List>
  </Box>
  <Grid container spacing={2}>
    <Grid item xs={7}>
      <TextField
        fullWidth
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message..."
      />
    </Grid>
    <Grid item xs={2.5}>
      <Button
        variant="contained"
        fullWidth
        onClick={handleSendMessage}
        sx={{
          backgroundColor: "#3f51b5", // Blue color
          "&:hover": { backgroundColor: "#303f9f" }, // Darker blue on hover
        }}
      >
        Send
      </Button>
    </Grid>
    <Grid item xs={2.5}>
      <Button
        variant="contained"
        fullWidth
        onClick={() => setMessages([])}
        sx={{
          backgroundColor: "#ff4444", 
          "&:hover": { backgroundColor: "#cc0000" }, 
        }}
      >
        Clear
      </Button>
    </Grid>
  </Grid>
</Paper>

      {/* Upload Permission Pop-Up Dialog */}
      <Dialog open={openUploadDialog} onClose={handleCloseUploadDialog}>
        <DialogTitle>Upload Assignment</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            You are uploading the assignment:{" "}
            <strong>{course.upcomingAssignments[0].assignment}</strong>
          </Typography>
          <TextField
            fullWidth
            label="Upload File"
            type="file"
            InputLabelProps={{ shrink: true }}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Comments"
            multiline
            rows={4}
            placeholder="Add any comments or notes..."
          />
        </DialogContent>
        <DialogActions>
          {/* Cancel Button */}
          <Button
            onClick={handleCloseUploadDialog}
            sx={{
              backgroundColor: "#ff4444", // Red color
              color: "#fff",
              "&:hover": {
                backgroundColor: "#cc0000", // Darker red on hover
              },
            }}
          >
            Cancel
          </Button>

          {/* Upload Button */}
          <Button
            onClick={handleUpload}
            sx={{
              backgroundColor: "#00C851", // Green color
              color: "#fff",
              "&:hover": {
                backgroundColor: "#007E33", // Darker green on hover
              },
            }}
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>

      {/* Pop-Up Dialog for Download Confirmation */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Download Lecture Material</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to download the material for{" "}
            <strong>{selectedMaterial?.week}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          {/* Cancel Button */}
          <Button
            onClick={handleCloseDialog}
            sx={{
              backgroundColor: "#ff4444", // Red color
              color: "#fff",
              "&:hover": {
                backgroundColor: "#cc0000", // Darker red on hover
              },
            }}
          >
            Cancel
          </Button>

          {/* Download Button */}
          <Button
            onClick={handleDownload}
            sx={{
              backgroundColor: "#00C851", // Green color
              color: "#fff",
              "&:hover": {
                backgroundColor: "#007E33", // Darker green on hover
              },
            }}
          >
            Download
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CourseMaterials;