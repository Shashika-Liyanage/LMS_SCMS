import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Paper,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Chip,
  Divider,
  Tooltip,
  IconButton
} from '@mui/material';
import {
  Add as AddIcon,
  ArrowBack as BackIcon,
  FilterList as FilterIcon,
  Print as PrintIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { useSchedule } from './SheduleContext';

const ClassroomSchedule = () => {
  const navigate = useNavigate();
  const { 
    classrooms, 
    lecturers, 
    batches, 
    timeSlots, 
    daysOfWeek, 
    timeOptions 
  } = useSchedule();

  // Filters
  const [selectedClassroom, setSelectedClassroom] = useState('all');
  const [selectedLecturer, setSelectedLecturer] = useState('all');
  const [selectedBatch, setSelectedBatch] = useState('all');
  const [selectedDay, setSelectedDay] = useState('all');

  // Filter time slots based on selection
  const filteredTimeSlots = timeSlots.filter(slot => {
    return (selectedClassroom === 'all' || slot.classroom === selectedClassroom) &&
           (selectedLecturer === 'all' || slot.lecturer === selectedLecturer) &&
           (selectedBatch === 'all' || slot.batch === selectedBatch) &&
           (selectedDay === 'all' || slot.day === selectedDay);
  });

  // Group time slots by day for display
  const timeSlotsByDay = daysOfWeek.reduce((acc, day) => {
    acc[day] = filteredTimeSlots.filter(slot => slot.day === day);
    return acc;
  }, {});

  // Get class name for a time slot
  const getTimeSlotClassName = (slot) => {
    const classroom = classrooms.find(c => c.id === slot.classroom);
    const batch = batches.find(b => b.id === slot.batch);
    return `${slot.subject} (${classroom?.name}, ${batch?.name})`;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <IconButton onClick={() => navigate('/admin/class-times')}>
          <BackIcon />
        </IconButton>
        <Typography variant="h4" sx={{ ml: 1 }}>
          Class Schedule
        </Typography>
      </Box>
      <Divider sx={{ mb: 3 }} />
      
      {/* Filters */}
      <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">
            <FilterIcon sx={{ fontSize: 20, mr: 1, verticalAlign: 'text-bottom' }} />
            Filter Options
          </Typography>
          <Box>
            <IconButton size="small" sx={{ mr: 1 }}>
              <RefreshIcon fontSize="small" />
            </IconButton>
            <IconButton size="small">
              <PrintIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Classroom</InputLabel>
              <Select
                value={selectedClassroom}
                label="Classroom"
                onChange={(e) => setSelectedClassroom(e.target.value)}
              >
                <MenuItem value="all">All Classrooms</MenuItem>
                {classrooms.map(classroom => (
                  <MenuItem key={classroom.id} value={classroom.id}>
                    {classroom.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Lecturer</InputLabel>
              <Select
                value={selectedLecturer}
                label="Lecturer"
                onChange={(e) => setSelectedLecturer(e.target.value)}
              >
                <MenuItem value="all">All Lecturers</MenuItem>
                {lecturers.map(lecturer => (
                  <MenuItem key={lecturer.id} value={lecturer.id}>
                    {lecturer.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Batch</InputLabel>
              <Select
                value={selectedBatch}
                label="Batch"
                onChange={(e) => setSelectedBatch(e.target.value)}
              >
                <MenuItem value="all">All Batches</MenuItem>
                {batches.map(batch => (
                  <MenuItem key={batch.id} value={batch.id}>
                    {batch.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Day</InputLabel>
              <Select
                value={selectedDay}
                label="Day"
                onChange={(e) => setSelectedDay(e.target.value)}
              >
                <MenuItem value="all">All Days</MenuItem>
                {daysOfWeek.map(day => (
                  <MenuItem key={day} value={day}>
                    {day}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Add Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/admin/class-times/schedule/new-class')}
        >
          Schedule New Class
        </Button>
      </Box>
      
      {/* Weekly Schedule Grid */}
      <Paper variant="outlined" sx={{ mb: 4, overflow: 'auto' }}>
        <Box sx={{ minWidth: 800, p: 2 }}>
          {daysOfWeek.map(day => (
            <Box key={day} sx={{ mb: 4 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 2,
                  bgcolor: 'primary.main',
                  color: 'white',
                  p: 1,
                  borderRadius: 1
                }}
              >
                {day}
              </Typography>
              
              {timeSlotsByDay[day] && timeSlotsByDay[day].length > 0 ? (
                timeSlotsByDay[day].map(slot => {
                  const classroom = classrooms.find(c => c.id === slot.classroom);
                  const lecturer = lecturers.find(l => l.id === slot.lecturer);
                  const batch = batches.find(b => b.id === slot.batch);
                  
                  return (
                    <Paper 
                      key={slot.id} 
                      variant="outlined" 
                      sx={{ 
                        p: 2, 
                        mb: 2,
                        bgcolor: slot.status === 'Postponed' ? '#fff9c4' : '#f5f5f5',
                        position: 'relative'
                      }}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={3}>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {slot.subject}
                          </Typography>
                          <Typography variant="body2">
                            {slot.startTime} - {slot.endTime}
                          </Typography>
                          {slot.status === 'Postponed' && (
                            <Chip 
                              label="Rescheduled" 
                              size="small" 
                              color="warning" 
                              sx={{ mt: 1 }}
                            />
                          )}
                        </Grid>
                        
                        <Grid item xs={12} md={3}>
                          <Typography variant="body2" color="text.secondary">
                            Classroom
                          </Typography>
                          <Typography variant="body1">
                            {classroom?.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {classroom?.building}, {classroom?.floor}
                          </Typography>
                        </Grid>
                        
                        <Grid item xs={12} md={3}>
                          <Typography variant="body2" color="text.secondary">
                            Lecturer
                          </Typography>
                          <Typography variant="body1">
                            {lecturer?.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Department: {lecturer?.department}
                          </Typography>
                        </Grid>
                        
                        <Grid item xs={12} md={3}>
                          <Typography variant="body2" color="text.secondary">
                            Student Batch
                          </Typography>
                          <Typography variant="body1">
                            {batch?.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {batch?.students} students
                          </Typography>
                          
                          <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                            <Button 
                              size="small" 
                              variant="outlined"
                              onClick={() => navigate(`/schedule/edit/${slot.id}`)}
                            >
                              Edit
                            </Button>
                          </Box>
                        </Grid>
                        
                        {slot.status === 'Postponed' && (
                          <Grid item xs={12}>
                            <Box sx={{ bgcolor: 'rgba(255, 152, 0, 0.1)', p: 1, borderRadius: 1, mt: 1 }}>
                              <Typography variant="body2" fontWeight="medium">
                                Rescheduled to: {slot.rescheduledDay}, {slot.rescheduledStartTime} - {slot.rescheduledEndTime}
                                {slot.rescheduledDate && ` (${new Date(slot.rescheduledDate).toLocaleDateString()})`}
                              </Typography>
                            </Box>
                          </Grid>
                        )}
                      </Grid>
                    </Paper>
                  );
                })
              ) : (
                <Paper variant="outlined" sx={{ p: 3, textAlign: 'center', mb: 2 }}>
                  <Typography variant="body1" color="text.secondary">
                    No classes scheduled for {day}
                  </Typography>
                </Paper>
              )}
            </Box>
          ))}
        </Box>
      </Paper>
    </Container>
  );
};

export default ClassroomSchedule;