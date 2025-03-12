import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  Box,
  AppBar,
  Toolbar,
} from "@mui/material";
import { Menu } from "@mui/icons-material";

const LecturerSidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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
            SCMS - Lecturer
           </Typography>
      <List>
        <ListItem button>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem button>
          <ListItemText primary="Course Materials" />
        </ListItem>

        <ListItem button>
          <ListItemText primary="Class & Timetables" />
        </ListItem>

        <ListItem button>
          <ListItemText primary="Manage Events" />
        </ListItem>

        <ListItem button>
          <ListItemText primary="Announcement" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      {/* Top AppBar for Mobile */}
      <AppBar position="fixed" sx={{ backgroundColor: "#1E3A8A", display: { md: "none" } }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle}>
            <Menu />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
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
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default LecturerSidebar;
