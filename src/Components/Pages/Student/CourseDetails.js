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
  TextField,
} from "@mui/material";

const CourseDetails = () => {

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { sender: "You", text: newMessage }]);
      setNewMessage("");
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      {/* Course Title */}
      <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        Advance Data Modelling
      </Typography>

      {/* Upload/Download Materials */}
      <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        Course Materials
      </Typography>
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button variant="contained" fullWidth>
              Upload Materials
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" fullWidth>
              Download Materials
            </Button>
          </Grid>
        </Grid>
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
          <Grid item xs={9}>
            <TextField
              fullWidth
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleSendMessage}
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Personalized Alerts */}
      <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        Personalized Alerts
      </Typography>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant="body1">
          Customize your email, SMS, or in-app alerts for upcoming events,
          administrative changes, or class schedule adjustments.
        </Typography>
        <Button variant="contained" sx={{ marginTop: 2 }}>
          Manage Alerts
        </Button>
      </Paper>
    </Box>
  );
};

export default CourseDetails;