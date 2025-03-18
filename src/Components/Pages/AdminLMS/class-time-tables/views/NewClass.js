import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Container,
    Typography,
    Paper,
    TextField,
    Grid,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Divider,
    Stepper,
    Step,
    StepLabel,
    FormHelperText,
    Alert,
    Autocomplete,
    Stack,
    Chip,
    Radio,
    RadioGroup,
    FormControlLabel,
    IconButton,
    Tooltip
} from '@mui/material';
import {
    CalendarMonth as CalendarIcon,
    Person as LecturerIcon,
    Group as BatchIcon,
    MeetingRoom as ClassroomIcon,
    Check as CheckIcon,
    ArrowBack as BackIcon,
    ArrowForward as ForwardIcon,
    Help as HelpIcon,
    Save as SaveIcon
} from '@mui/icons-material';
import { useSchedule } from '../SheduleContext';
import { daysOfWeek, timeOptions } from '../dummyData';

const AddNewClass = () => {
    const navigate = useNavigate();
    const {
        classrooms,
        lecturers,
        batches,
        timeSlots,
        addTimeSlot
    } = useSchedule();

    // Multi-step form state
    const [activeStep, setActiveStep] = useState(0);
    const steps = ['Schedule Details', 'Select Resources', 'Review & Confirm'];

    // Form data
    const [formData, setFormData] = useState({
        subject: '',
        day: '',
        startTime: '',
        endTime: '',
        lecturer: '',
        batch: '',
        classroom: '',
        status: 'Confirmed',
        notes: '',
        recurrence: 'none',  // none, weekly, biweekly
        endDate: ''
    });

    // Validation state
    const [errors, setErrors] = useState({});
    const [conflicts, setConflicts] = useState([]);
    const [success, setSuccess] = useState(false);

    // Helper function to check time conflicts
    const checkConflicts = () => {
        const newConflicts = [];

        // Skip if we don't have enough data to check
        if (!formData.day || !formData.startTime || !formData.endTime) {
            return newConflicts;
        }

        const formStart = timeToMinutes(formData.startTime);
        const formEnd = timeToMinutes(formData.endTime);

        // Check for time conflicts with existing slots
        const conflictingSlots = timeSlots.filter(slot => {
            if (slot.day !== formData.day) return false;

            const slotStart = timeToMinutes(slot.startTime);
            const slotEnd = timeToMinutes(slot.endTime);

            // Check for overlap
            return (formStart < slotEnd && formEnd > slotStart);
        });

        // Create conflict messages
        conflictingSlots.forEach(slot => {
            const lecturer = lecturers.find(l => l.id === slot.lecturer);
            const batch = batches.find(b => b.id === slot.batch);
            const classroom = classrooms.find(c => c.id === slot.classroom);

            // Check for specific conflicts
            if (formData.lecturer && slot.lecturer === formData.lecturer) {
                newConflicts.push(`Lecturer ${lecturer?.name} is already scheduled for ${slot.subject} (${slot.startTime}-${slot.endTime})`);
            }

            if (formData.batch && slot.batch === formData.batch) {
                newConflicts.push(`Batch ${batch?.name} is already scheduled for ${slot.subject} (${slot.startTime}-${slot.endTime})`);
            }

            if (formData.classroom && slot.classroom === formData.classroom) {
                newConflicts.push(`Classroom ${classroom?.name} is already booked for ${slot.subject} (${slot.startTime}-${slot.endTime})`);
            }
        });

        return newConflicts;
    };

    // Helper to convert time string to minutes for comparison
    const timeToMinutes = (timeStr) => {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours * 60 + minutes;
    };

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear relevant errors
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    // Handle autocomplete changes
    const handleAutocompleteChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear relevant errors
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

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

    // Get available classrooms
    const getAvailableClassrooms = () => {
        if (!formData.day || !formData.startTime || !formData.endTime) {
            return classrooms;
        }

        const formStart = timeToMinutes(formData.startTime);
        const formEnd = timeToMinutes(formData.endTime);

        // Find classrooms that don't have conflicts
        return classrooms.filter(classroom => {
            if (classroom.status !== 'Available') return false;

            // Check for booking conflicts
            return !timeSlots.some(slot => {
                if (slot.classroom !== classroom.id || slot.day !== formData.day) return false;

                const slotStart = timeToMinutes(slot.startTime);
                const slotEnd = timeToMinutes(slot.endTime);

                // Check for overlap
                return (formStart < slotEnd && formEnd > slotStart);
            });
        });
    };

    const availableClassrooms = getAvailableClassrooms();

    // Validate current step
    const validateStep = () => {
        const newErrors = {};

        if (activeStep === 0) {
            // Validate schedule details
            if (!formData.subject) newErrors.subject = 'Subject is required';
            if (!formData.day) newErrors.day = 'Day is required';
            if (!formData.startTime) newErrors.startTime = 'Start time is required';
            if (!formData.endTime) newErrors.endTime = 'End time is required';

            // Validate time logic
            if (formData.startTime && formData.endTime) {
                const start = timeToMinutes(formData.startTime);
                const end = timeToMinutes(formData.endTime);

                if (start >= end) {
                    newErrors.endTime = 'End time must be after start time';
                }
            }

            // Validate recurrence
            if (formData.recurrence !== 'none' && !formData.endDate) {
                newErrors.endDate = 'End date is required for recurring classes';
            }
        } else if (activeStep === 1) {
            // Validate resources
            if (!formData.lecturer) newErrors.lecturer = 'Lecturer is required';
            if (!formData.batch) newErrors.batch = 'Batch is required';
            if (!formData.classroom) newErrors.classroom = 'Classroom is required';

            // Check for conflicts
            const newConflicts = checkConflicts();
            if (newConflicts.length > 0) {
                setConflicts(newConflicts);

                setConflicts(newConflicts);
            } else {
                setConflicts([]);
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle next step
    const handleNext = () => {
        if (validateStep()) {
            setActiveStep(prevStep => prevStep + 1);
        }
    };

    // Handle back step
    const handleBack = () => {
        setActiveStep(prevStep => prevStep - 1);
        setConflicts([]);
    };

    // Handle submit
    const handleSubmit = () => {
        // Final validation
        if (conflicts.length > 0) {
            return; // Don't submit if there are conflicts
        }

        // Create new time slot
        const newTimeSlot = {
            id: `TS${String(timeSlots.length + 1).padStart(3, '0')}`,
            ...formData
        };

        // Add the new time slot
        addTimeSlot(newTimeSlot);

        // Create recurring slots if needed
        if (formData.recurrence !== 'none') {
            // Implementation for recurring slots would go here
            // This would involve creating multiple slots based on the recurrence pattern
        }

        // Show success message
        setSuccess(true);

        // Redirect after a delay
        setTimeout(() => {
            navigate('/admin/class-times');
        }, 2000);
    };

    // Render different steps
    const renderStepContent = () => {
        switch (activeStep) {
            case 0:
                return (
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Subject/Course Name"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                error={!!errors.subject}
                                helperText={errors.subject}
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
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

                        <Grid item xs={12} md={4}>
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

                        <Grid item xs={12} md={4}>
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
                            <Typography variant="subtitle1" gutterBottom>
                                Recurrence Pattern
                            </Typography>
                            <FormControl component="fieldset">
                                <RadioGroup
                                    row
                                    name="recurrence"
                                    value={formData.recurrence}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value="none" control={<Radio />} label="One-time" />
                                    <FormControlLabel value="weekly" control={<Radio />} label="Weekly" />
                                    <FormControlLabel value="biweekly" control={<Radio />} label="Bi-weekly" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        {formData.recurrence !== 'none' && (
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="End Date"
                                    name="endDate"
                                    type="date"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    error={!!errors.endDate}
                                    helperText={errors.endDate || "Last date for recurring classes"}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                        )}

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Notes (Optional)"
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                multiline
                                rows={3}
                                placeholder="Add any additional information or special instructions"
                            />
                        </Grid>
                    </Grid>
                );

            case 1:
                return (
                    <Grid container spacing={3}>
                        {conflicts.length > 0 && (
                            <Grid item xs={12}>
                                <Alert severity="warning" sx={{ mb: 2 }}>
                                    <Typography variant="subtitle2">Schedule Conflicts Detected:</Typography>
                                    <ul style={{ margin: 0, paddingLeft: 20 }}>
                                        {conflicts.map((conflict, index) => (
                                            <li key={index}>{conflict}</li>
                                        ))}
                                    </ul>
                                </Alert>
                            </Grid>
                        )}

                        <Grid item xs={12} md={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <LecturerIcon color="primary" sx={{ mr: 1 }} />
                                <Typography variant="h6">Select Lecturer</Typography>
                            </Box>

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
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <BatchIcon color="primary" sx={{ mr: 1 }} />
                                <Typography variant="h6">Select Batch</Typography>
                            </Box>

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
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <ClassroomIcon color="primary" sx={{ mr: 1 }} />
                                <Typography variant="h6">Select Classroom</Typography>
                            </Box>

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
                                            <Chip
                                                size="small"
                                                label={option.equipment}
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
                                            availableClassrooms.length === 0 ? "No classrooms available at selected time" : ""
                                        )}
                                    />
                                )}
                                onChange={(e, value) =>
                                    handleAutocompleteChange('classroom', value ? value.id : '')
                                }
                            />

                            {availableClassrooms.length === 0 && formData.day && formData.startTime && formData.endTime && (
                                <Alert severity="info" sx={{ mt: 2 }}>
                                    No classrooms are available for the selected time slot. Please choose a different time or day.
                                </Alert>
                            )}
                        </Grid>
                    </Grid>
                );

            case 2:
                const selectedLecturer = lecturers.find(l => l.id === formData.lecturer);
                const selectedBatch = batches.find(b => b.id === formData.batch);
                const selectedClassroom = classrooms.find(c => c.id === formData.classroom);

                return (
                    <Grid container spacing={3}>
                        {success && (
                            <Grid item xs={12}>
                                <Alert severity="success" sx={{ mb: 3 }}>
                                    Class has been successfully scheduled! Redirecting to schedule...
                                </Alert>
                            </Grid>
                        )}

                        <Grid item xs={12}>
                            <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
                                <Typography variant="h6" gutterBottom>
                                    Class Details
                                </Typography>

                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" color="text.secondary">Subject</Typography>
                                        <Typography variant="body1">{formData.subject}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" color="text.secondary">Day</Typography>
                                        <Typography variant="body1">{formData.day}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" color="text.secondary">Time</Typography>
                                        <Typography variant="body1">{formData.startTime} - {formData.endTime}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" color="text.secondary">Recurrence</Typography>
                                        <Typography variant="body1">
                                            {formData.recurrence === 'none' ? 'One-time' :
                                                formData.recurrence === 'weekly' ? 'Weekly' : 'Bi-weekly'}
                                        </Typography>
                                    </Grid>

                                    {formData.recurrence !== 'none' && (
                                        <Grid item xs={6}>
                                            <Typography variant="body2" color="text.secondary">Until</Typography>
                                            <Typography variant="body1">{formData.endDate}</Typography>
                                        </Grid>
                                    )}
                                </Grid>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Paper variant="outlined" sx={{ p: 3, height: '100%' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <LecturerIcon color="primary" sx={{ mr: 1 }} />
                                    <Typography variant="h6">Lecturer</Typography>
                                </Box>
                                <Typography variant="body1">{selectedLecturer?.name}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Department: {selectedLecturer?.department}
                                </Typography>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Paper variant="outlined" sx={{ p: 3, height: '100%' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <BatchIcon color="primary" sx={{ mr: 1 }} />
                                    <Typography variant="h6">Batch</Typography>
                                </Box>
                                <Typography variant="body1">{selectedBatch?.name}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {selectedBatch?.students} students
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Department: {selectedBatch?.department}
                                </Typography>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Paper variant="outlined" sx={{ p: 3, height: '100%' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <ClassroomIcon color="primary" sx={{ mr: 1 }} />
                                    <Typography variant="h6">Classroom</Typography>
                                </Box>
                                <Typography variant="body1">{selectedClassroom?.name}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {selectedClassroom?.building}, {selectedClassroom?.floor}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Capacity: {selectedClassroom?.capacity} students
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Equipment: {selectedClassroom?.equipment}
                                </Typography>
                            </Paper>
                        </Grid>

                        {formData.notes && (
                            <Grid item xs={12}>
                                <Paper variant="outlined" sx={{ p: 3 }}>
                                    <Typography variant="h6" gutterBottom>Notes</Typography>
                                    <Typography variant="body2">{formData.notes}</Typography>
                                </Paper>
                            </Grid>
                        )}

                        {conflicts.length > 0 && (
                            <Grid item xs={12}>
                                <Alert severity="warning">
                                    There are scheduling conflicts that need to be resolved before proceeding.
                                </Alert>
                            </Grid>
                        )}
                    </Grid>
                );

            default:
                return null;
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Paper sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <IconButton
                        onClick={() => navigate('/admin/class-times')}
                        sx={{ mr: 2 }}
                    >
                        <BackIcon />
                    </IconButton>
                    <Typography variant="h5" component="h1">
                        Add New Class
                    </Typography>
                    <Tooltip title="Add classes to your schedule. Follow the steps to create a new class without conflicts.">
                        <IconButton sx={{ ml: 1 }}>
                            <HelpIcon />
                        </IconButton>
                    </Tooltip>
                </Box>

                <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {renderStepContent()}

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                    <Button
                        startIcon={<BackIcon />}
                        onClick={handleBack}
                        disabled={activeStep === 0}
                    >
                        Back
                    </Button>

                    <Box>
                        {activeStep === steps.length - 1 ? (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                                startIcon={<SaveIcon />}
                                disabled={conflicts.length > 0 || success}
                            >
                                Schedule Class
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                                endIcon={<ForwardIcon />}
                            >
                                Next
                            </Button>
                        )}
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default AddNewClass;