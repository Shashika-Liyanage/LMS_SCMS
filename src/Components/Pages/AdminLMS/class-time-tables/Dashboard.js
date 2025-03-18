import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Paper,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton
} from '@mui/material';
import {
  Class as ClassroomIcon,
  Schedule as ScheduleIcon,
  Person as LecturerIcon,
  Group as BatchIcon,
  CalendarToday as TodayIcon,
  Add as AddIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { useSchedule } from './SheduleContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { 
    classrooms, 
    lecturers, 
    batches, 
    timeSlots 
  } = useSchedule();

  // Get today's day name
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todayTimeSlots = timeSlots.filter(slot => 
    slot.day === today || (slot.status === 'Postponed' && slot.rescheduledDay === today)
  );

  // Count stats
  const availableClassrooms = classrooms.filter(room => room.status === 'Available').length;
  const confirmedTimeSlots = timeSlots.filter(slot => slot.status === 'Confirmed').length;
  const postponedTimeSlots = timeSlots.filter(slot => slot.status === 'Postponed').length;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Classroom Scheduler Dashboard
      </Typography>
      <Divider sx={{ mb: 4 }} />
      
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#f5f5f5' }} variant="outlined">
            <CardContent>
              <ClassroomIcon color="primary" fontSize="large" />
              <Typography variant="h5" component="div">
                {classrooms.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Classrooms
              </Typography>
              <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
                {availableClassrooms} Available
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => navigate('/classrooms')}>
                View All
              </Button>
            </CardActions>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#f5f5f5' }} variant="outlined">
            <CardContent>
              <LecturerIcon color="primary" fontSize="large" />
              <Typography variant="h5" component="div">
                {lecturers.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lecturers
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">
                View All
              </Button>
            </CardActions>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#f5f5f5' }} variant="outlined">
            <CardContent>
              <BatchIcon color="primary" fontSize="large" />
              <Typography variant="h5" component="div">
                {batches.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Student Batches
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">
                View All
              </Button>
            </CardActions>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#f5f5f5' }} variant="outlined">
            <CardContent>
              <ScheduleIcon color="primary" fontSize="large" />
              <Typography variant="h5" component="div">
                {timeSlots.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Scheduled Classes
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Typography variant="body2" color="success.main">
                  {confirmedTimeSlots} Confirmed
                </Typography>
                <Typography variant="body2" color="warning.main">
                  {postponedTimeSlots} Postponed
                </Typography>
              </Box>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => navigate('/admin/class-times/schedule')}>
                View Schedule
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      
      {/* Today's Schedule */}
      <Paper elevation={0} variant="outlined" sx={{ p: 2, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TodayIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6">
              Today's Schedule ({today})
            </Typography>
          </Box>
          <IconButton size="small">
            <RefreshIcon fontSize="small" />
          </IconButton>
        </Box>
        
        {todayTimeSlots.length > 0 ? (
          <List>
            {todayTimeSlots.map(slot => {
              const classroom = classrooms.find(c => c.id === slot.classroom);
              const lecturer = lecturers.find(l => l.id === slot.lecturer);
              const batch = batches.find(b => b.id === slot.batch);
              
              // Use rescheduled values if postponed
              const displayDay = slot.status === 'Postponed' ? slot.rescheduledDay : slot.day;
              const displayStartTime = slot.status === 'Postponed' ? slot.rescheduledStartTime : slot.startTime;
              const displayEndTime = slot.status === 'Postponed' ? slot.rescheduledEndTime : slot.endTime;
              
              return (
                <ListItem 
                  key={slot.id}
                  sx={{ 
                    bgcolor: slot.status === 'Postponed' ? '#fff9c4' : 'white',
                    mb: 1,
                    border: '1px solid #e0e0e0',
                    borderRadius: 1
                  }}
                >
                  <ListItemIcon>
                    <ClassroomIcon color={slot.status === 'Postponed' ? 'warning' : 'primary'} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1">
                        {slot.subject} 
                        {slot.status === 'Postponed' && 
                          <Typography component="span" variant="caption" sx={{ ml: 1, color: 'warning.main' }}>
                            (Rescheduled)
                          </Typography>
                        }
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" component="span">
                          {displayStartTime} - {displayEndTime} | {classroom?.name}
                        </Typography>
                        <br />
                        <Typography variant="body2" component="span">
                          {lecturer?.name} | {batch?.name} ({batch?.students} students)
                        </Typography>
                      </>
                    }
                  />
                  <Button 
                    variant="outlined" 
                    size="small"
                    onClick={() => navigate(`/schedule/edit/${slot.id}`)}
                  >
                    Edit
                  </Button>
                </ListItem>
              );
            })}
          </List>
        ) : (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Typography variant="body1" color="text.secondary">
              No classes scheduled for today
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />} 
              sx={{ mt: 2 }}
              onClick={() => navigate('/admin/class-times/class/new')}
            >
              Add New Class
            </Button>
          </Box>
        )}
      </Paper>
      
      {/* Quick Actions */}
      <Typography variant="h6" gutterBottom>
        Quick Actions
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Button 
            variant="contained" 
            fullWidth 
            onClick={() => navigate('/admin/class-times/schedule/new-class')}
            startIcon={<AddIcon />}
          >
            Schedule New Class
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button 
            variant="outlined" 
            fullWidth
            onClick={() => navigate('/admin/class-times/schedule/view-all')}
          >
            View Full Schedule
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;