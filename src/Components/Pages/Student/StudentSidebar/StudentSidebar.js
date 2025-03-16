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
  Divider,
} from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import DateRangeIcon from '@mui/icons-material/DateRange';
import EventIcon from '@mui/icons-material/Event';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Menu } from "@mui/icons-material";

const StudentSidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeButton, setActiveButton] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleButtonClick = (action) => {
    setActiveButton(action);
    console.log(`Clicked: ${action}`);
  };

  const drawerContent = (
    <Box
      sx={{
        width: 240,
        backgroundColor: "#1E3A8A",
        color: "#fff",
        height: "100vh",
        padding: "20px 10px",
      }}
    >
      {/* Sidebar Title */}
      <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center", paddingBottom: "12px" }}>
        📘 Student Portal
      </Typography>

      <Divider sx={{ backgroundColor: "#fff", marginBottom: "12px" }} />

      <List sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {/* Dashboard Section */}
        <Typography variant="subtitle2" sx={{ paddingLeft: "12px", opacity: 0.8 }}>
          MAIN MENU
        </Typography>
        <ListItem>
          <Button
            fullWidth
            variant="outlined"
            sx={{
              color: "#fff",
              "&:hover": { backgroundColor: "#2563EB" },
              marginTop: "6px",
              borderColor: activeButton === "Dashboard" ? "#2563EB" : "transparent",
              paddingLeft: "8px",
              justifyContent: "flex-start",
              gap: "6px",
              textTransform: "none",
            }}
            startIcon={<DashboardIcon />}
            onClick={() => handleButtonClick("Dashboard")}
          >
            Dashboard
          </Button>
        </ListItem>

        {/* Course Materials Section */}
        <Typography variant="subtitle2" sx={{ paddingLeft: "12px", opacity: 0.8, marginTop: "8px" }}>
          ACADEMICS
        </Typography>
        <ListItem>
          <Button
            fullWidth
            variant="outlined"
            sx={{
              color: "#fff",
              "&:hover": { backgroundColor: "#2563EB" },
              marginTop: "6px",
              borderColor: activeButton === "Course Materials" ? "#2563EB" : "transparent",
              paddingLeft: "8px",
              justifyContent: "flex-start",
              gap: "6px",
              textTransform: "none",
            }}
            startIcon={<AutoStoriesIcon />}
            onClick={() => handleButtonClick("Course Materials")}
          >
            Course Materials
          </Button>
        </ListItem>

        {/* My Schedule Section */}
        <ListItem>
          <Button
            fullWidth
            variant="outlined"
            sx={{
              color: "#fff",
              "&:hover": { backgroundColor: "#2563EB" },
              marginTop: "6px",
              borderColor: activeButton === "My Schedule" ? "#2563EB" : "transparent",
              paddingLeft: "8px",
              justifyContent: "flex-start",
              gap: "6px",
              textTransform: "none",
            }}
            startIcon={<DateRangeIcon />}
            onClick={() => handleButtonClick("My Schedule")}
          >
            My Schedule
          </Button>
        </ListItem>

        {/* Events Section */}
        <Typography variant="subtitle2" sx={{ paddingLeft: "12px", opacity: 0.8, marginTop: "8px" }}>
          CAMPUS LIFE
        </Typography>
        <ListItem>
          <Button
            fullWidth
            variant="outlined"
            sx={{
              color: "#fff",
              "&:hover": { backgroundColor: "#2563EB" },
              marginTop: "6px",
              borderColor: activeButton === "My Events" ? "#2563EB" : "transparent",
              paddingLeft: "8px",
              justifyContent: "flex-start",
              gap: "6px",
              textTransform: "none",
            }}
            startIcon={<EventIcon />}
            onClick={() => handleButtonClick("My Events")}
          >
            My Events
          </Button>
        </ListItem>

        {/* Notifications Section */}
        <Typography variant="subtitle2" sx={{ paddingLeft: "12px", opacity: 0.8, marginTop: "8px" }}>
          ALERTS
        </Typography>
        <ListItem>
          <Button
            fullWidth
            variant="outlined"
            sx={{
              color: "#fff",
              "&:hover": { backgroundColor: "#2563EB" },
              marginTop: "6px",
              borderColor: activeButton === "Notifications" ? "#2563EB" : "transparent",
              paddingLeft: "8px",
              justifyContent: "flex-start",
              gap: "6px",
              textTransform: "none",
            }}
            startIcon={<NotificationsIcon />}
            onClick={() => handleButtonClick("Notifications")}
          >
            Notifications
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
        sx={{
          backgroundColor: "#1E3A8A",
          display: { md: "none" },
          minHeight: "80px",
        }}
      >
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle}>
            <Menu sx={{ marginTop: "15px" }} />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, marginTop: "15px" }}>
            Smart Campus Management System - Student
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": { width: 260 },
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
          "& .MuiDrawer-paper": { width: 260 },
          marginTop: "80px",
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default StudentSidebar;
