// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import {
//   Container,
//   Paper,
//   Typography,
//   Grid,
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Button,
//   Box,
//   Divider,
//   FormHelperText,
//   Alert,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions
// } from '@mui/material';
// import {
//   ArrowBack as BackIcon,
//   Save as SaveIcon,
//   Delete as DeleteIcon,
//   CalendarMonth as RescheduleIcon
// } from '@mui/icons-material';
// import { useSchedule } from '../context/ScheduleContext';

// const TimeSlotForm = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const isEditMode = !!id;
  
//   const {
//     classrooms,
//     lecturers,
//     batches,
//     timeSlots,
//     daysOfWeek,
//     timeOptions,
//     addTimeSlot,
//     updateTimeSlot,
//     deleteTimeSlot,
//     rescheduleTimeSlot,
//     checkClassroomAvailability,
//     checkLecturerAvailability,
//     checkBatchAvailability
//   } = useSchedule();

//   // Form state
//   const [formData, setFormData] = useState({
//     subject: '',
//     classroom: '',
//     lecturer: '',
//     batch: '',
//     day: '',
//     startTime: '',
//     endTime: ''
//   });
  
//   // Rescheduling state
//   const [rescheduleData, setRescheduleData] = useState({
//     day: '',
//     startTime: '',
//     endTime: '',
//     date: ''
//   });
  
//   // UI state
//   const [errors, setErrors] = useState({});
//   const [showRescheduleDialog, setShowRescheduleDialog] = useState(false);
//   const [showDeleteDialog, setShowDeleteDialog] = useState(false);
//   const [formAlert, setFormAlert] = useState({ show: false, severity: 'info', message: '' });

//   // Load existing time slot data if in edit mode
//   useEffect(() => {
//     if (isEditMode) {
//       const timeSlot = timeSlots.find(slot => slot.id === id);
//       if (timeSlot) {
//         setFormData({
//           subject: timeSlot.subject,
//           classroom: timeSlot.classroom,
//           lecturer: timeSlot.lecturer,
//           batch: timeSlot.batch,
//           day: timeSlot.day,
//           startTime: timeSlot.startTime,
//           endTime: timeSlot.endTime
//         });
        
//         if (timeSlot.status === 'Postponed') {
//           setRescheduleData({
//             day: timeSlot.rescheduledDay || '',
//             startTime: timeSlot.rescheduledStartTime || '',
//             endTime: timeSlot.rescheduledEndTime || '',
//             date: timeSlot.rescheduledDate || ''
//           });
//         }
//       } else {
//         // Handle if time slot not found
//         setFormAlert({
//           show: true,
//           severity: 'error',
//           message: 'Time slot not found!'
//         });
//       }
//     }
//   }, [isEditMode, id, timeSlots]);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
    
//     // Clear related errors when field changes
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: null }));
//     }
    
//     // If changing start or end time, check all availabilities
//     if (name === 'startTime' || name === 'endTime') {
//       checkAvailability();
//     }
//   };

//   // Handle reschedule data changes
//   const handleRescheduleChange = (e) => {
//     const { name, value } = e.target;
//     setRescheduleData(prev => ({ ...prev, [name]: value }));
//   };

//   // Check availability of classroom, lecturer and batch
//   const checkAvailability = () => {
//     if (!formData.day || !formData.startTime || !formData.endTime) return;
    
//     // Skip availability check if we're editing the same slot
//     const currentSlot = isEditMode ? timeSlots.find(slot => slot.id === id) : null;
    
//     // Clear previous errors
//     setErrors({});
    
//     // Check classroom availability
//     if (formData.classroom) {
//       const classroomAvailable = checkClassroomAvailability(
//         formData.classroom,
//         formData.day,
//         formData.startTime,
//         formData.endTime,
//         currentSlot?.id
//       );
      
//       if (!classroomAvailable) {
//         setErrors(prev => ({
//           ...prev,
//           classroom: 'Classroom is not available during this time'
//         }));
//       }
//     }
    
//     // Check lecturer availability
//     if (formData.lecturer) {
//       const lecturerAvailable = checkLecturerAvailability(
//         formData.lecturer,
//         formData.day,
//         formData.startTime,
//         formData.endTime,
//         currentSlot?.id
//       );
      
//       if (!lecturerAvailable) {
//         setErrors(prev => ({
//           ...prev,
//           lecturer: 'Lecturer is not available during this time'
//         }));
//       }
//     }
    
//     // Check batch availability
//     if (formData.batch) {
//       const batchAvailable = checkBatchAvailability(
//         formData.batch,
//         formData.day,
//         formData.startTime,
//         formData.endTime,
//         currentSlot?.id
//       );
      
//       if (!batchAvailable) {
//         setErrors(prev => ({
//           ...prev,
//           batch: 'Batch is already scheduled during this time'
//         }));
//       }
//     }
//   };

//   // Validate form before submission
//   const validateForm = () => {
//     const newErrors = {};
    
//     // Check required fields
//     if (!formData.subject) newErrors.subject = 'Subject is required';
//     if (!formData.classroom) newErrors.classroom = 'Classroom is required';
//     if (!formData.lecturer) newErrors.lecturer = 'Lecturer is required';
//     if (!formData.batch) newErrors.batch = 'Batch is required';
//     if (!formData.day) newErrors.day = 'Day is required';
//     if (!formData.startTime) newErrors.startTime = 'Start time is required';
//     if (!formData.endTime) newErrors.endTime = 'End time is required';
    
//     // Validate time range
//     if (formData.startTime && formData.endTime) {
//       const start = timeOptions.findIndex(t => t.value === formData.startTime);
//       const end = timeOptions.findIndex(t => t.value === formData.endTime);
      
//       if (start >= end) {
//         newErrors.endTime = 'End time must be after start time';
//       }
//     }
    
//     // Run availability checks
//     checkAvailability();
    
//     setErrors(prev => ({ ...prev, ...newErrors }));
//     return Object.keys(newErrors).length === 0 && Object.keys(errors).length === 0;
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       setFormAlert({
//         show: true,
//         severity: 'error',
//         message: 'Please fix the errors before submitting'
//       });
//       return;
//     }
    
//     try {
//       if (isEditMode) {
//         updateTimeSlot(id, formData);
//         setFormAlert({
//           show: true,
//           severity: 'success',
//           message: 'Time slot updated successfully!'
//         });
//       } else {
//         addTimeSlot(formData);
//         setFormAlert({
//           show: true,
//           severity: 'success',
//           message: 'Time slot added successfully!'
//         });
        
//         // Clear form after successful addition
//         setFormData({
//           subject: '',
//           classroom: '',
//           lecturer: '',
//           batch: '',
//           day: '',
//           startTime: '',
//           endTime: ''
//         });
//       }
//     } catch (error) {
//       setFormAlert({
//         show: true,
//         severity: 'error',
//         message: error.message || 'An error occurred while saving'
//       });
//     }
//   };

//   // Handle delete
//   const handleDelete = () => {
//     try {
//       deleteTimeSlot(id);
//       setShowDeleteDialog(false);
//       setFormAlert({
//         show: true,
//         severity: 'success',
//         message: 'Time slot deleted successfully!'
//       });
      
//       // Navigate back after a short delay
//       setTimeout(() => {
//         navigate('/time-slots');
//       }, 1500);
//     } catch (error) {
//       setFormAlert({
//         show: true,
//         severity: 'error',
//         message: error.message || 'An error occurred while deleting'
//       });
//       setShowDeleteDialog(false);
//     }
//   };

//   // Handle reschedule
//   const handleReschedule = () => {
//     try {
//       rescheduleTimeSlot(id, rescheduleData);
//       setShowRescheduleDialog(false);
//       setFormAlert({
//         show: true,
//         severity: 'success',
//         message: 'Time slot rescheduled successfully!'
//       });
      
//       // Reload the time slot data
//       const updatedTimeSlot = timeSlots.find(slot => slot.id === id);
//       if (updatedTimeSlot) {
//         setFormData({
//           subject: updatedTimeSlot.subject,
//           classroom: updatedTimeSlot.classroom,
//           lecturer: updatedTimeSlot.lecturer,
//           batch: updatedTimeSlot.batch,
//           day: updatedTimeSlot.day,
//           startTime: updatedTimeSlot.startTime,
//           endTime: updatedTimeSlot.endTime
//         });
        
//         if (updatedTimeSlot.status === 'Postponed') {
//           setRescheduleData({
//             day: updatedTimeSlot.rescheduledDay || '',
//             startTime: updatedTimeSlot.rescheduledStartTime || '',
//             endTime: updatedTimeSlot.rescheduledEndTime || '',
//             date: updatedTimeSlot.rescheduledDate || ''
//           });
//         }
//       }
//     } catch (error) {
//       setFormAlert({
//         show: true,
//         severity: 'error',
//         message: error.message || 'An error occurred while rescheduling'
//       });
//       setShowRescheduleDialog(false);
//     }
//   };

//   return (
//     <Container maxWidth="md" sx={{ py: 4 }}>
//       <Paper elevation={3} sx={{ p: 3 }}>
//         {/* Header */}
//         <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
//           <IconButton onClick={() => navigate('/time-slots')} sx={{ mr: 2 }}>
//             <BackIcon />
//           </IconButton>
//           <Typography variant="h5">
//             {isEditMode ? 'Edit Time Slot' : 'Add New Time Slot'}
//           </Typography>
//           {isEditMode && (
//             <Box sx={{ ml: 'auto', display: 'flex' }}>
//               <IconButton 
//                 color="primary" 
//                 onClick={() => setShowRescheduleDialog(true)}
//                 title="Reschedule"
//               >
//                 <RescheduleIcon />
//               </IconButton>
//               <IconButton 
//                 color="error" 
//                 onClick={() => setShowDeleteDialog(true)}
//                 title="Delete"
//               >
//                 <DeleteIcon />
//               </IconButton>
//             </Box>
//           )}
//         </Box>
        
//         {/* Alerts */}
//         {formAlert.show && (
//           <Alert 
//             severity={formAlert.severity} 
//             sx={{ mb: 3 }}
//             onClose={() => setFormAlert({ ...formAlert, show: false })}
//           >
//             {formAlert.message}
//           </Alert>
//         )}
        
//         {/* Main Form */}
//         <form onSubmit={handleSubmit}>
//           <Grid container spacing={3}>
//             {/* Subject */}
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Subject"
//                 name="subject"
//                 value={formData.subject}
//                 onChange={handleChange}
//                 error={!!errors.subject}
//                 helperText={errors.subject}
//                 required
//               />
//             </Grid>
            
//             {/* Classroom */}
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth error={!!errors.classroom} required>
//                 <InputLabel>Classroom</InputLabel>
//                 <Select
//                   name="classroom"
//                   value={formData.classroom}
//                   onChange={handleChange}
//                   label="Classroom"
//                 >
//                   {classrooms.map(classroom => (
//                     <MenuItem key={classroom.id} value={classroom.id}>
//                       {classroom.name} ({classroom.building})
//                     </MenuItem>
//                   ))}
//                 </Select>
//                 {errors.classroom && (
//                   <FormHelperText>{errors.classroom}</FormHelperText>
//                 )}
//               </FormControl>
//             </Grid>
            
//             {/* Lecturer */}
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth error={!!errors.lecturer} required>
//                 <InputLabel>Lecturer</InputLabel>
//                 <Select
//                   name="lecturer"
//                   value={formData.lecturer}
//                   onChange={handleChange}
//                   label="Lecturer"
//                 >
//                   {lecturers.map(lecturer => (
//                     <MenuItem key={lecturer.id} value={lecturer.id}>
//                       {lecturer.name}
//                     </MenuItem>
//                   ))}
//                 </Select>
//                 {errors.lecturer && (
//                   <FormHelperText>{errors.lecturer}</FormHelperText>
//                 )}
//               </FormControl>
//             </Grid>
            
//             {/* Batch */}
//             <Grid item xs={12}>
//               <FormControl fullWidth error={!!errors.batch} required>
//                 <InputLabel>Batch</InputLabel>
//                 <Select
//                   name="batch"
//                   value={formData.batch}
//                   onChange={handleChange}
//                   label="Batch"
//                 >
//                   {batches.map(batch => (
//                     <MenuItem key={batch.id} value={batch.id}>
//                       {batch.name} ({batch.program})
//                     </MenuItem>
//                   ))}
//                 </Select>
//                 {errors.batch && (
//                   <FormHelperText>{errors.batch}</FormHelperText>
//                 )}
//               </FormControl>
//             </Grid>
            
//             <Grid item xs={12}>
//               <Divider sx={{ my: 1 }}>
//                 <Typography variant="body2" color="text.secondary">
//                   Time Slot
//                 </Typography>
//               </Divider>
//             </Grid>
            
//             {/* Day */}
//             <Grid item xs={12} sm={4}>
//               <FormControl fullWidth error={!!errors.day} required>
//                 <InputLabel>Day</InputLabel>
//                 <Select
//                   name="day"
//                   value={formData.day}
//                   onChange={handleChange}
//                   label="Day"
//                 >
//                   {daysOfWeek.map(day => (
//                     <MenuItem key={day} value={day}>
//                       {day}
//                     </MenuItem>
//                   ))}
//                 </Select>
//                 {errors.day && (
//                   <FormHelperText>{errors.day}</FormHelperText>
//                 )}
//                 </FormHelperText>
//               </FormControl>
//             </Grid>
            
//             {/* Start Time */}
//             <Grid item xs={12} sm={4}>
//               <FormControl fullWidth error={!!errors.startTime} required>
//                 <InputLabel>Start Time</InputLabel>
//                 <Select
//                   name="startTime"
//                   value={formData.startTime}
//                   onChange={handleChange}
//                   label="Start Time"
//                 >
//                   {timeOptions.map(time => (
//                     <MenuItem key={time.value} value={time.value}>
//                       {time.label}
//                     </MenuItem>
//                   ))}
//                 </Select>
//                 {errors.startTime && (
//                   <FormHelperText>{errors.startTime}</FormHelperText>
//                 )}
//               </FormControl>
//             </Grid>
            
//             {/* End Time */}
//             <Grid item xs={12} sm={4}>
//               <FormControl fullWidth error={!!errors.endTime} required>
//                 <InputLabel>End Time</InputLabel>
//                 <Select
//                   name="endTime"
//                   value={formData.endTime}
//                   onChange={handleChange}
//                   label="End Time"
//                 >
//                   {timeOptions.map(time => (
//                     <MenuItem key={time.value} value={time.value}>
//                       {time.label}
//                     </MenuItem>
//                   ))}
//                 </Select>
//                 {errors.endTime && (
//                   <FormHelperText>{errors.endTime}</FormHelperText>
//                 )}
//               </FormControl>
//             </Grid>
            
//             {/* Form Actions */}
//             <Grid item xs={12} sx={{ mt: 2 }}>
//               <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
//                 <Button 
//                   variant="outlined" 
//                   onClick={() => navigate('/time-slots')}
//                 >
//                   Cancel
//                 </Button>
//                 <Button 
//                   type="submit" 
//                   variant="contained" 
//                   startIcon={<SaveIcon />}
//                 >
//                   {isEditMode ? 'Update' : 'Save'}
//                 </Button>
//               </Box>
//             </Grid>
//           </Grid>
//         </form>
//       </Paper>

//       <Dialog open={showRescheduleDialog} onClose={() => setShowRescheduleDialog(false)}>
//         <DialogTitle>Reschedule Time Slot</DialogTitle>
//         <DialogContent>
//           <DialogContentText sx={{ mb: 3 }}>
//             Please select new date and time for this session.
//           </DialogContentText>
          
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Date"
//                 type="date"
//                 name="date"
//                 value={rescheduleData.date}
//                 onChange={handleRescheduleChange}
//                 InputLabelProps={{ shrink: true }}
//                 required
//               />
//             </Grid>
            
//             <Grid item xs={12}>
//               <FormControl fullWidth required>
//                 <InputLabel>Day</InputLabel>
//                 <Select
//                   name="day"
//                   value={rescheduleData.day}
//                   onChange={handleRescheduleChange}
//                   label="Day"
//                 >
//                   {daysOfWeek.map(day => (
//                     <MenuItem key={day} value={day}>
//                       {day}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
            
//             <Grid item xs={6}>
//               <FormControl fullWidth required>
//                 <InputLabel>Start Time</InputLabel>
//                 <Select
//                   name="startTime"
//                   value={rescheduleData.startTime}
//                   onChange={handleRescheduleChange}
//                   label="Start Time"
//                 >
//                   {timeOptions.map(time => (
//                     <MenuItem key={time.value} value={time.value}>
//                       {time.label}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
            
//             <Grid item xs={6}>
//               <FormControl fullWidth required>
//                 <InputLabel>End Time</InputLabel>
//                 <Select
//                   name="endTime"
//                   value={rescheduleData.endTime}
//                   onChange={handleRescheduleChange}
//                   label="End Time"
//                 >
//                   {timeOptions.map(time => (
//                     <MenuItem key={time.value} value={time.value}>
//                       {time.label}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setShowRescheduleDialog(false)}>Cancel</Button>
//           <Button 
//             onClick={handleReschedule} 
//             variant="contained" 
//             color="primary"
//           >
//             Reschedule
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Dialog open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
//         <DialogTitle>Delete Time Slot</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Are you sure you want to delete this time slot? This action cannot be undone.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
//           <Button 
//             onClick={handleDelete} 
//             variant="contained" 
//             color="error"
//           >
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// };

// export default TimeSlotForm;