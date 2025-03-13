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
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import DateRangeIcon from '@mui/icons-material/DateRange';
import FestivalIcon from '@mui/icons-material/Festival';
import CampaignIcon from '@mui/icons-material/Campaign';
import { Menu } from "@mui/icons-material";

const AdminSidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleButtonClick = (action) => {
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
      <Typography variant="h5" sx={{ fontWeight: "bold", padding: "16px 0" }}>
        SCMS - Admin
      </Typography>
      <List>
        {/* Dashboard Button */}
        <ListItem>
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#3B82F6",
              color: "#fff",
              "&:hover": { backgroundColor: "#2563EB" },
              marginTop: "8px",
            }}
            startIcon={<DashboardIcon />}
            onClick={() => handleButtonClick("Dashboard")}
          >
            Dashboard
          </Button>
        </ListItem>

        {/* Manage User Button */}
        <ListItem>
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#3B82F6",
              color: "#fff",
              "&:hover": { backgroundColor: "#2563EB" },
              marginTop: "8px",
            }}
            startIcon={<SupervisedUserCircleIcon />}
            onClick={() => handleButtonClick("Manage User")}
          >
            Manage User
          </Button>
        </ListItem>

        {/* Manage Course Materials Button */}
        <ListItem>
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#3B82F6",
              color: "#fff",
              "&:hover": { backgroundColor: "#2563EB" },
              marginTop: "8px",
            }}
            startIcon={<AutoStoriesIcon />}
            onClick={() => handleButtonClick("Manage Course Materials")}
          >
            Manage Course Materials
          </Button>
        </ListItem>

        {/* Manage Class & Timetables Button */}
        <ListItem>
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#3B82F6",
              color: "#fff",
              "&:hover": { backgroundColor: "#2563EB" },
              marginTop: "8px",
            }}
            startIcon={<DateRangeIcon />}
            onClick={() => handleButtonClick("Manage Class & Timetables")}
          >
            Manage Class & Timetables
          </Button>
        </ListItem>

        {/* Manage Events Button */}
        <ListItem>
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#3B82F6",
              color: "#fff",
              "&:hover": { backgroundColor: "#2563EB" },
              marginTop: "8px",
            }}
            startIcon={<FestivalIcon />}
            onClick={() => handleButtonClick("Manage Events")}
          >
            Manage Events
          </Button>
        </ListItem>

        {/* Manage Announcement Button */}
        <ListItem>
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#3B82F6",
              color: "#fff",
              "&:hover": { backgroundColor: "#2563EB" },
              marginTop: "8px",
            }}
            startIcon={<CampaignIcon />}
            onClick={() => handleButtonClick("Manage Announcement")}
          >
            Manage Announcement
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
            Smart Campus Management System - Admin
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

export default AdminSidebar;