import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  Typography,
  IconButton,
  Box,
  AppBar,
  Toolbar,
  Button,
} from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import DateRangeIcon from '@mui/icons-material/DateRange';
import FestivalIcon from '@mui/icons-material/Festival';
import CampaignIcon from '@mui/icons-material/Campaign';
import { Menu } from "@mui/icons-material";

const LecturerSidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeButton, setActiveButton] = useState(null); // Track active button

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleButtonClick = (action) => {
    setActiveButton(action); // Set active button when clicked
    console.log(`Clicked: ${action}`); // Replace with your logic
  };

  const drawerContent = (
    <Box
      sx={{
        width: 220,
        backgroundColor: "#1E3A8A",
        color: "#fff",
        height: "100vh",
        padding: "10px",
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: "bold", padding: "8px 0" }}>
        SCMS - Lecturer
      </Typography>
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        {/* Dashboard Button */}
        <ListItem>
          <Button
            fullWidth
            variant="outlined"
            sx={{
              color: "#fff",
              "&:hover": { backgroundColor: "#2563EB" },
              marginTop: "8px",
              borderColor: activeButton === "Dashboard" ? "#2563EB" : "transparent", // Highlight clicked button
              paddingLeft: "16px",
              justifyContent: "flex-start",
            }}
            startIcon={<DashboardIcon />}
            onClick={() => handleButtonClick("Dashboard")}
          >
            Dashboard
          </Button>
        </ListItem>

        {/* Course Materials Button */}
        <ListItem>
          <Button
            fullWidth
            variant="outlined"
            sx={{
              color: "#fff",
              "&:hover": { backgroundColor: "#2563EB" },
              marginTop: "8px",
              borderColor: activeButton === "Course Materials" ? "#2563EB" : "transparent", // Highlight clicked button
              paddingLeft: "16px", // Ensure icon starts from the left
              justifyContent: "flex-start", // Align icon to the left
            }}
            startIcon={<AutoStoriesIcon />}
            onClick={() => handleButtonClick("Course Materials")}
          >
            Course Materials
          </Button>
        </ListItem>

        {/* Class & Timetables Button */}
        <ListItem>
          <Button
            fullWidth
            variant="outlined"
            sx={{
              color: "#fff",
              "&:hover": { backgroundColor: "#2563EB" },
              marginTop: "8px",
              borderColor: activeButton === "Class & Timetables" ? "#2563EB" : "transparent", // Highlight clicked button
              paddingLeft: "16px", // Ensure icon starts from the left
              justifyContent: "flex-start", // Align icon to the left
            }}
            startIcon={<DateRangeIcon />}
            onClick={() => handleButtonClick("Class & Timetables")}
          >
            Class & Timetables
          </Button>
        </ListItem>

        {/* Manage Events Button */}
        <ListItem>
          <Button
            fullWidth
            variant="outlined"
            sx={{
              color: "#fff",
              "&:hover": { backgroundColor: "#2563EB" },
              marginTop: "8px",
              borderColor: activeButton === "Manage Events" ? "#2563EB" : "transparent", // Highlight clicked button
              paddingLeft: "16px", // Ensure icon starts from the left
              justifyContent: "flex-start", // Align icon to the left
            }}
            startIcon={<FestivalIcon />}
            onClick={() => handleButtonClick("Manage Events")}
          >
            Manage Events
          </Button>
        </ListItem>

        {/* Announcement Button */}
        <ListItem>
          <Button
            fullWidth
            variant="outlined"
            sx={{
              color: "#fff",
              "&:hover": { backgroundColor: "#2563EB" },
              marginTop: "8px",
              borderColor: activeButton === "Announcement" ? "#2563EB" : "transparent", // Highlight clicked button
              paddingLeft: "16px", // Ensure icon starts from the left
              justifyContent: "flex-start", // Align icon to the left
            }}
            startIcon={<CampaignIcon />}
            onClick={() => handleButtonClick("Announcement")}
          >
            Announcement
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      {/* Top AppBar for Mobile */}
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "#1E3A8A", 
          display: { md: "none" }, 
          minHeight: "80px" }}
      >
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle}>
            <Menu sx={{ marginTop: "15px" }} />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, marginTop: "15px" }}>
            Smart Campus Management System - Lecturer
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          display: { xs: "none", md: "block" }, // Hide on small screens
          "& .MuiDrawer-paper": { width: 240 },
        }}
        open
      >
        {drawerContent}
      </Drawer>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { width: 240 },
          marginTop: "80px",
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default LecturerSidebar;