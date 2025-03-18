import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Container,
  Typography,
  TextField,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Divider,
  Alert,
  Autocomplete,
  Stack,
  Chip
} from '@mui/material';
import {
  Schedule as ScheduleIcon,
  Save as SaveIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { useSchedule } from '../SheduleContext';
import { daysOfWeek, timeOptions } from '../dummyData';

const NewSchedule = () => {
  const navigate = useNavigate();
  const { 
    classrooms, 
    lecturers, 
    batches, 
    timeSlots,
    addTimeSlot 
  } = useSchedule();

  const [formData, setFormData] = useState({
    day: '',
    startTime: '',
    endTime: '',
    classroom: '',
    subject: '',
    lecturer: '',
    batch: '',
    status: 'Confirmed',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [conflict, setConflict] = useState(null);
  const [success, setSuccess] = useState(false);

  // Filter available classrooms based on selected day and time
  const getAvailableClassrooms = () => {
    if (!formData.day || !formData.startTime || !formData.endTime) {
      return classrooms;
    }

    // Find potentially conflicting slots
    const conflictingSlots = timeSlots.filter(slot => {
      if (slot.day !== formData.day) return false;
      
      const slotStart = timeToMinutes(slot.startTime);
      const slotEnd = timeToMinutes(slot.endTime);
      const formStart = timeToMinutes(formData.startTime);
      const formEnd = timeToMinutes(formData.endTime);
      
      // Check for overlap
      return (formStart < slotEnd && formEnd > slotStart);
    });
    
    // Get IDs of classrooms that are already booked
    const bookedClassroomIds = conflictingSlots.map(slot => slot.classroom);
    
    // Return only available classrooms
    return classrooms.filter(classroom => 
      classroom.status === 'Available' && !bookedClassroomIds.includes(classroom.id)
    );
  };

  // Helper to convert time string to minutes
  const timeToMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const availableClassrooms = getAvailableClassrooms();

  // Check lecturer availability
  const isLecturerAvailable = (lecturerId) => {
    if (!formData.day || !formData.startTime || !formData.endTime) {
      return true;
    }

    return !timeSlots.some(slot => {
      if (slot.lecturer !== lecturerId || slot.day !== formData.day) return false;
      
      const slotStart = timeToMinutes(slot.startTime);
      const slotEnd = timeToMinutes(slot.endTime);
      const formStart = timeToMinutes(formData.startTime);
      const formEnd = timeToMinutes(formData.endTime);
      
      // Check for overlap
      return (formStart < slotEnd && formEnd > slotStart);
    });
  };

  // Check batch availability
  const isBatchAvailable = (batchId) => {
    if (!formData.day || !formData.startTime || !formData.endTime) {
      return true;
    }

    return !timeSlots.some(slot => {
      if (slot.batch !== batchId || slot.day !== formData.day) return false;
      
      const slotStart = timeToMinutes(slot.startTime);
      const slotEnd = timeToMinutes(slot.endTime);
      const formStart = timeToMinutes(formData.startTime);
      const formEnd = timeToMinutes(formData.endTime);
      
      // Check for overlap
      return (formStart < slotEnd && formEnd > slotStart);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear relevant errors
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Clear conflict message
    if (conflict) {
      setConflict(null);
    }
  };

  const handleAutocompleteChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear relevant errors
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate required fields
    if (!formData.day) newErrors.day = 'Day is required';
    if (!formData.startTime) newErrors.startTime = 'Start time is required';
    if (!formData.endTime) newErrors.endTime = 'End time is required';
    if (!formData.classroom) newErrors.classroom = 'Classroom is required';
    if (!formData.subject) newErrors.subject = 'Subject is required';
    if (!formData.lecturer) newErrors.lecturer = 'Lecturer is required';
    if (!formData.batch) newErrors.batch = 'Batch is required';
    
    // Validate time logic
    if (formData.startTime && formData.endTime) {
      const start = timeToMinutes(formData.startTime);
      const end = timeToMinutes(formData.endTime);
      
      if (start >= end) {
        newErrors.endTime = 'End time must be after start time';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Check for conflicts
    const selectedLecturer = lecturers.find(l => l.id === formData.lecturer);
    const selectedBatch = batches.find(b => b.id === formData.batch);
    
    if (!isLecturerAvailable(formData.lecturer)) {
      setConflict(`${selectedLecturer.name} already has a class scheduled at this time.`);
      return;
    }
    
    if (!isBatchAvailable(formData.batch)) {
      setConflict(`${selectedBatch.name} already has a class scheduled at this time.`);
      return;
    }
    
    // Create new time slot
    const newTimeSlot = {
      id: `TS${String(timeSlots.length + 1).padStart(3, '0')}`,
      ...formData
    };
    
    // Add the new time slot
    addTimeSlot(newTimeSlot);
    
    // Show success message
    setSuccess(true);
    
    // Reset form after success (optional)
    setTimeout(() => {
      navigate('/schedule');
    }, 1500);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={0} variant="outlined" sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <ScheduleIcon color="primary" sx={{ mr: 2 }} fontSize="large" />
          <Typography variant="h4">Schedule New Class</Typography>
        </Box>
        
        <Divider sx={{ mb: 4 }} />
        
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Class successfully scheduled. Redirecting to schedule...
          </Alert>
        )}
        
        {conflict && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {conflict}
          </Alert>
        )}
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.day}>
                <InputLabel>Day</InputLabel>
                <Select
                  name="day"
                  value={formData.day}
                  onChange={handleChange}
                  label="Day"
                >
                  {daysOfWeek.map(day => (
                    <MenuItem key={day} value={day}>{day}</MenuItem>
                  ))}
                </Select>
                {errors.day && <FormHelperText>{errors.day}</FormHelperText>}
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <FormControl fullWidth error={!!errors.startTime}>
                <InputLabel>Start Time</InputLabel>
                <Select
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  label="Start Time"
                >
                  {timeOptions.map(time => (
                    <MenuItem key={`start-${time}`} value={time}>{time}</MenuItem>
                  ))}
                </Select>
                {errors.startTime && <FormHelperText>{errors.startTime}</FormHelperText>}
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <FormControl fullWidth error={!!errors.endTime}>
                <InputLabel>End Time</InputLabel>
                <Select
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  label="End Time"
                >
                  {timeOptions.map(time => (
                    <MenuItem key={`end-${time}`} value={time}>{time}</MenuItem>
                  ))}
                </Select>
                {errors.endTime && <FormHelperText>{errors.endTime}</FormHelperText>}
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                error={!!errors.subject}
                helperText={errors.subject}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Autocomplete
                fullWidth
                options={lecturers}
                getOptionLabel={(option) => option.name || ''}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography>{option.name}</Typography>
                      <Chip 
                        size="small" 
                        label={option.department} 
                        color="primary" 
                        variant="outlined"
                      />
                      {!isLecturerAvailable(option.id) && (
                        <Chip 
                          size="small" 
                          label="Not Available" 
                          color="error" 
                          variant="outlined" 
                        />
                      )}
                    </Stack>
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Lecturer"
                    error={!!errors.lecturer}
                    helperText={errors.lecturer}
                  />
                )}
                onChange={(e, value) => 
                  handleAutocompleteChange('lecturer', value ? value.id : '')
                }
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Autocomplete
                fullWidth
                options={batches}
                getOptionLabel={(option) => option.name || ''}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography>{option.name}</Typography>
                      <Chip 
                        size="small" 
                        label={`${option.students} students`} 
                        color="primary" 
                        variant="outlined"
                      />
                      {!isBatchAvailable(option.id) && (
                        <Chip 
                          size="small" 
                          label="Not Available" 
                          color="error" 
                          variant="outlined" 
                        />
                      )}
                    </Stack>
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Batch"
                    error={!!errors.batch}
                    helperText={errors.batch}
                  />
                )}
                onChange={(e, value) => 
                  handleAutocompleteChange('batch', value ? value.id : '')
                }
              />
            </Grid>
            
            <Grid item xs={12}>
              <Autocomplete
                fullWidth
                options={availableClassrooms}
                getOptionLabel={(option) => option.name || ''}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography>{option.name}</Typography>
                      <Chip 
                        size="small" 
                        label={`${option.capacity} seats`} 
                        color="primary" 
                        variant="outlined"
                      />
                      <Chip 
                        size="small" 
                        label={option.building} 
                        variant="outlined" 
                      />
                    </Stack>
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Classroom"
                    error={!!errors.classroom}
                    helperText={errors.classroom || (
                      availableClassrooms.length === 0 && formData.day && formData.startTime && formData.endTime
                        ? "No classrooms available at this time"
                        : ""
                    )}
                  />
                )}
                onChange={(e, value) => 
                  handleAutocompleteChange('classroom', value ? value.id : '')
                }
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes (Optional)"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                multiline
                rows={3}
              />
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/admin/class-times')}
            >
              Back to Dashboard
            </Button>
            
            <Button
              type="submit"
              variant="contained"
              startIcon={<SaveIcon />}
              disabled={success}
            >
              Schedule Class
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default NewSchedule;