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
import DashboardIcon from "@mui/icons-material/Dashboard";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import DateRangeIcon from "@mui/icons-material/DateRange";
import FestivalIcon from "@mui/icons-material/Festival";
import CampaignIcon from "@mui/icons-material/Campaign";
import { Menu } from "@mui/icons-material";

const LecturerSidebar = () => {
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
      <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center", paddingBottom: "12px" }}>
        🎓 Lecturer Portal
      </Typography>

      <Divider sx={{ backgroundColor: "#fff", marginBottom: "12px" }} />

      <List sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
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

        <ListItem>
          <Button
            fullWidth
            variant="outlined"
            sx={{
              color: "#fff",
              "&:hover": { backgroundColor: "#2563EB" },
              marginTop: "6px",
              borderColor: activeButton === "Class & Timetables" ? "#2563EB" : "transparent",
              paddingLeft: "8px",
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
              borderColor: activeButton === "Manage Events" ? "#2563EB" : "transparent",
              paddingLeft: "8px",
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

        <Typography variant="subtitle2" sx={{ paddingLeft: "12px", opacity: 0.8, marginTop: "8px" }}>
          ANNOUNCEMENTS
        </Typography>
        <ListItem>
          <Button
            fullWidth
            variant="outlined"
            sx={{
              color: "#fff",
              "&:hover": { backgroundColor: "#2563EB" },
              marginTop: "6px",
              borderColor: activeButton === "Announcement" ? "#2563EB" : "transparent",
              paddingLeft: "8px",
              justifyContent: "flex-start",
              gap: "6px",
              textTransform: "none",
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
      <AppBar position="fixed" sx={{ backgroundColor: "#1E3A8A", display: { md: "none" }, minHeight: "80px" }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle}>
            <Menu sx={{ marginTop: "15px" }} />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, marginTop: "15px" }}>
            Smart Campus Management System - Lecturer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" anchor="left" sx={{ display: { xs: "none", md: "block" }, "& .MuiDrawer-paper": { width: 260 } }} open>
        {drawerContent}
      </Drawer>
      <Drawer variant="temporary" anchor="left" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }} sx={{ display: { xs: "block", md: "none" }, "& .MuiDrawer-paper": { width: 260 }, marginTop: "80px" }}>
        {drawerContent}
      </Drawer>
    </>
  );
};

export default LecturerSidebar;
