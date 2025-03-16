import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  Typography,
  Box,
  Button,
  Divider,
  IconButton,
  AppBar,
  Toolbar,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import DateRangeIcon from "@mui/icons-material/DateRange";
import FestivalIcon from "@mui/icons-material/Festival";
import CampaignIcon from "@mui/icons-material/Campaign";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 260;

const AdminSidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeButton, setActiveButton] = useState("Dashboard");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleButtonClick = (action) => {
    setActiveButton(action);
  };

  const drawerContent = (
    <Box
      sx={{
        width: "240px",
        backgroundColor: "#1E3A8A",
        color: "#fff",
        height: "100vh",
        padding: "20px 10px",
      }}
    >
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", textAlign: "center", paddingBottom: "12px" }}
      >
        ⚙️ Admin Portal
      </Typography>

      <Divider sx={{ backgroundColor: "#fff", marginBottom: "12px" }} />

      <List sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <Typography variant="subtitle2" sx={{ paddingLeft: "12px", opacity: 0.8 }}>
          MAIN MENU
        </Typography>
        <ListItem>
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: activeButton === "Dashboard" ? "#2563EB" : "transparent",
              color: "#fff",
              "&:hover": { backgroundColor: "#2563EB" },
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

        <Typography variant="subtitle2" sx={{ paddingLeft: "12px", opacity: 0.8, marginTop: "8px" }}>
          USER MANAGEMENT
        </Typography>
        <ListItem>
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: activeButton === "Manage User" ? "#2563EB" : "transparent",
              color: "#fff",
              "&:hover": { backgroundColor: "#2563EB" },
              justifyContent: "flex-start",
              gap: "6px",
              textTransform: "none",
            }}
            startIcon={<SupervisedUserCircleIcon />}
            onClick={() => handleButtonClick("Manage User")}
          >
            Manage Users
          </Button>
        </ListItem>

        <Typography variant="subtitle2" sx={{ paddingLeft: "12px", opacity: 0.8, marginTop: "8px" }}>
          ACADEMICS
        </Typography>
        <ListItem>
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: activeButton === "Course Materials" ? "#2563EB" : "transparent",
              color: "#fff",
              "&:hover": { backgroundColor: "#2563EB" },
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

        <ListItem>
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: activeButton === "Class & Timetables" ? "#2563EB" : "transparent",
              color: "#fff",
              "&:hover": { backgroundColor: "#2563EB" },
              justifyContent: "flex-start",
              gap: "6px",
              textTransform: "none",
            }}
            startIcon={<DateRangeIcon />}
            onClick={() => handleButtonClick("Class & Timetables")}
          >
            Class & Timetables
          </Button>
        </ListItem>

        <Typography variant="subtitle2" sx={{ paddingLeft: "12px", opacity: 0.8, marginTop: "8px" }}>
          EVENTS & ANNOUNCEMENTS
        </Typography>
        <ListItem>
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: activeButton === "Manage Events" ? "#2563EB" : "transparent",
              color: "#fff",
              "&:hover": { backgroundColor: "#2563EB" },
              justifyContent: "flex-start",
              gap: "6px",
              textTransform: "none",
            }}
            startIcon={<FestivalIcon />}
            onClick={() => handleButtonClick("Manage Events")}
          >
            Manage Events
          </Button>
        </ListItem>

        <ListItem>
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: activeButton === "Announcement" ? "#2563EB" : "transparent",
              color: "#fff",
              "&:hover": { backgroundColor: "#2563EB" },
              justifyContent: "flex-start",
              gap: "6px",
              textTransform: "none",
            }}
            startIcon={<CampaignIcon />}
            onClick={() => handleButtonClick("Announcement")}
          >
            Announcements
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "#1E3A8A", display: { md: "none" } }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Admin Portal
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" sx={{ display: { xs: "none", md: "block" }, "& .MuiDrawer-paper": { width: drawerWidth } }} open>
        {drawerContent}
      </Drawer>

      <Drawer variant="temporary" open={mobileOpen} onClose={handleDrawerToggle}>
        {drawerContent}
      </Drawer>
    </>
  );
};

export default AdminSidebar;
