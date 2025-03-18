import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentSidebar from "./StudentSidebar/StudentSidebar";
import Navbar from "../../../Components/NavBar/Navbar";
import {
  Box,
  Typography,
  Paper,
  Grid,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import WavingHandIcon from "@mui/icons-material/WavingHand";

function Student() {
  const navigate = useNavigate();

  // State for controlling the pop-up dialog
  const [openDialog, setOpenDialog] = useState(false);

  // Course data
  const course = {
    code: "E30FT",
    title: "KU BSc in Software Engineering (2023 Update) - JAN Intake",
    description: "Course duration details will be provided soon. Stay tuned for updates!",
    modules: [
      { id: 1, name: "Individual Project" },
      { id: 2, name: "Software Development Practice" },
      { id: 3, name: "Advance Data Modelling" },
    ],
  };

  const handleSubjectClick = (subjectId) => {
    if (subjectId === 3) { // Check if the clicked subject is "Advance Data Modelling"
      navigate("/course-materials"); // Navigate to the CourseMaterial page
    }
  };

  // Handle "View Details" button click
  const handleViewDetails = () => {
    setOpenDialog(true); // Open the pop-up dialog
  };

  // Handle closing the pop-up dialog
  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the pop-up dialog
  };

  const userName = "A.d.u.m.u Kumari";

  // Days of the week
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Months of the year
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  // Function to generate dates for a given month and year
  const getMonthDates = (year, month) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const dates = [];
    let week = [];

    // Fill the first week with null for days before the first day of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
      week.push(null);
    }

    // Fill the rest of the days
    for (let day = 1; day <= lastDay.getDate(); day++) {
      week.push(day);
      if (week.length === 7) {
        dates.push(week);
        week = [];
      }
    }

    // Fill the last week with null for days after the last day of the month
    if (week.length > 0) {
      while (week.length < 7) {
        week.push(null);
      }
      dates.push(week);
    }

    return dates;
  };

  // Year and months data
  const year = 2025;
  const yearData = months.map((month, index) => ({
    name: month,
    dates: getMonthDates(year, index),
  }));

  // State for current month index
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);

  // Handle next month
  const handleNextMonth = () => {
    setCurrentMonthIndex((prevIndex) => (prevIndex + 1) % 12);
  };

  // Handle previous month
  const handlePreviousMonth = () => {
    setCurrentMonthIndex((prevIndex) => (prevIndex - 1 + 12) % 12);
  };

  return (
    <>
      <StudentSidebar />
      <Navbar />

      {/* Greeting Section */}
      <Box
        sx={{
          display: "flex",
          marginLeft: "240px",
          alignItems: "center",
          padding: 2,
          backgroundColor: "#f5f5f5",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        {/* Greeting Text */}
        <Box>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Good Afternoon
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Hi, {userName}
          </Typography>
        </Box>

        {/* Hi Icon */}
        <WavingHandIcon
          sx={{
            marginLeft: "auto", // Push to the right
            color: "#ff9800", // Orange color
            fontSize: "2rem",
          }}
        />
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          marginLeft: "240px",
          padding: 3,
          display: "flex",
          gap: 4, // Space between calendar and course details
        }}
      >
        {/* Calendar Section */}
        <Box sx={{ flex: 2 }}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            {/* Month Navigation */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 2,
              }}
            >
              {/* Left Arrow */}
              <IconButton onClick={handlePreviousMonth}>
                <ChevronLeft />
              </IconButton>

              {/* Month and Year */}
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {yearData[currentMonthIndex].name} {year}
              </Typography>

              {/* Right Arrow */}
              <IconButton onClick={handleNextMonth}>
                <ChevronRight />
              </IconButton>
            </Box>

            {/* Days of the Week */}
            <Grid container spacing={1} sx={{ marginBottom: 1 }}>
              {daysOfWeek.map((day) => (
                <Grid item xs={1.7} key={day}>
                  <Typography variant="subtitle2" sx={{ textAlign: "center", fontWeight: "bold" }}>
                    {day}
                  </Typography>
                </Grid>
              ))}
            </Grid>

            {/* Month Dates */}
            {yearData[currentMonthIndex].dates.map((week, weekIndex) => (
              <Grid container spacing={1} key={weekIndex}>
                {week.map((date, dayIndex) => (
                  <Grid item xs={1.7} key={dayIndex}>
                    <Paper
                      elevation={date ? 1 : 0}
                      sx={{
                        padding: 1,
                        textAlign: "center",
                        backgroundColor: date ? "inherit" : "transparent",
                        minHeight: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography variant="body2">
                        {date || ""}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            ))}
          </Paper>
        </Box>

        {/* Course Details Section */}
        <Box sx={{ flex: 1 }}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            {/* Course Code */}
            <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>
              {course.code}
            </Typography>

            {/* Course Title */}
            <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
              {course.title}
            </Typography>

            {/* Course Description */}
            <Typography variant="body2" sx={{ marginBottom: 3 }}>
              {course.description}
            </Typography>

            {/* View Details Button */}
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#3f51b5",
                "&:hover": { backgroundColor: "#303f9f" },
              }}
              onClick={handleViewDetails}
            >
              View Details
            </Button>
          </Paper>
        </Box>
      </Box>

      {/* Pop-Up Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Course Modules</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <strong>Course Code:</strong> {course.code}
          </DialogContentText>
          <DialogContentText>
            <strong>Course Title:</strong> {course.title}
          </DialogContentText>
          <DialogContentText>
            <strong>Description:</strong> {course.description}
          </DialogContentText>

          {/* List of Subjects/Modules */}
          <List>
  {course.modules.map((module) => (
    <ListItem
      button
      key={module.id}
      onClick={() => handleSubjectClick(module.id)}
      sx={{
        backgroundColor: "#3f51b5",
        color: "#fff",
        marginBottom: 1,
        borderRadius: "8px",
        "&:hover": {
          backgroundColor: "#303f9f",
          transform: "scale(1.02)",
          transition: "transform 0.2s ease-in-out",
        },
      }}
    >
      <ListItemText
        primary={module.name}
        primaryTypographyProps={{ fontWeight: "bold" }}
      />
    </ListItem>
  ))}
</List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Student;