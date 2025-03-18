import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Paper,
    Container,
    Typography,
    Grid,
    Button,
    Tabs,
    Tab,
    Divider,
    Chip,
    IconButton,
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Card,
    CardContent,
    Stack,
    Tooltip,
    Badge
} from '@mui/material';
import {
    Schedule as ScheduleIcon,
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    FilterList as FilterIcon,
    Search as SearchIcon,
    ArrowForwardIos as ArrowForwardIcon,
    ArrowBackIos as ArrowBackIcon,
    CalendarToday as CalendarIcon,
    ViewList as ListIcon,
    Refresh as RefreshIcon
} from '@mui/icons-material';
import { useSchedule } from '../SheduleContext';
import { daysOfWeek } from '../dummyData';

const FullSchedule = () => {
    const navigate = useNavigate();
    const {
        classrooms,
        lecturers,
        batches,
        timeSlots,
        deleteTimeSlot
    } = useSchedule();

    // State for view and filters
    const [viewType, setViewType] = useState('weekly');
    const [currentWeek, setCurrentWeek] = useState(0);
    const [currentDay, setCurrentDay] = useState(daysOfWeek[0]);
    const [filters, setFilters] = useState({
        lecturer: '',
        batch: '',
        classroom: '',
        subject: '',
        status: ''
    });
    const [showFilters, setShowFilters] = useState(false);

    // Filter time slots based on selected filters
    const filteredTimeSlots = useMemo(() => {
        return timeSlots.filter(slot => {
            if (filters.lecturer && slot.lecturer !== filters.lecturer) return false;
            if (filters.batch && slot.batch !== filters.batch) return false;
            if (filters.classroom && slot.classroom !== filters.classroom) return false;
            if (filters.subject && !slot.subject.toLowerCase().includes(filters.subject.toLowerCase())) return false;
            if (filters.status && slot.status !== filters.status) return false;
            return true;
        });
    }, [timeSlots, filters]);

    // Get day-specific time slots
    const getDayTimeSlots = (day) => {
        return filteredTimeSlots.filter(slot =>
            slot.day === day || (slot.status === 'Postponed' && slot.rescheduledDay === day)
        );
    };

    // Get time slots for the current view
    const viewTimeSlots = useMemo(() => {
        if (viewType === 'weekly') {
            return filteredTimeSlots;
        } else {
            return getDayTimeSlots(currentDay);
        }
    }, [viewType, currentDay, filteredTimeSlots]);

    // Handle filter changes
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    // Clear all filters
    const clearFilters = () => {
        setFilters({
            lecturer: '',
            batch: '',
            classroom: '',
            subject: '',
            status: ''
        });
    };

    // Navigate to previous or next day
    const navigateDay = (direction) => {
        const currentIndex = daysOfWeek.indexOf(currentDay);
        if (direction === 'next' && currentIndex < daysOfWeek.length - 1) {
            setCurrentDay(daysOfWeek[currentIndex + 1]);
        } else if (direction === 'prev' && currentIndex > 0) {
            setCurrentDay(daysOfWeek[currentIndex - 1]);
        }
    };

    // Handle delete time slot
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this scheduled class?')) {
            deleteTimeSlot(id);
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={0} variant="outlined" sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ScheduleIcon color="primary" sx={{ mr: 2 }} fontSize="large" />
                        <Typography variant="h4">Class Schedule</Typography>
                    </Box>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => navigate('/schedule/new')}
                    >
                        Schedule New Class
                    </Button>
                </Box>

                <Divider sx={{ mb: 3 }} />

                {/* View Type Tabs */}
                <Box sx={{ mb: 3 }}>
                    <Tabs
                        value={viewType}
                        onChange={(e, value) => setViewType(value)}
                        sx={{ mb: 2 }}
                    >
                        <Tab
                            icon={<CalendarIcon />}
                            iconPosition="start"
                            label="Weekly View"
                            value="weekly"
                        />
                        <Tab
                            icon={<ListIcon />}
                            iconPosition="start"
                            label="Daily View"
                            value="daily"
                        />
                    </Tabs>

                    {viewType === 'daily' && (
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <IconButton onClick={() => navigateDay('prev')} disabled={currentDay === daysOfWeek[0]}>
                                <ArrowBackIcon />
                            </IconButton>
                            <Typography variant="h6" sx={{ mx: 2 }}>{currentDay}</Typography>
                            <IconButton onClick={() => navigateDay('next')} disabled={currentDay === daysOfWeek[daysOfWeek.length - 1]}>
                                <ArrowForwardIcon />
                            </IconButton>
                        </Box>
                    )}
                </Box>

                {/* Filters */}
                <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <TextField
                            placeholder="Search by subject"
                            size="small"
                            name="subject"
                            value={filters.subject}
                            onChange={handleFilterChange}
                            InputProps={{
                                startAdornment: <SearchIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1 }} />
                            }}
                            sx={{ width: 250 }}
                        />
                        <Button
                            startIcon={<FilterIcon />}
                            onClick={() => setShowFilters(!showFilters)}
                            variant={showFilters ? "contained" : "outlined"}
                            color={showFilters ? "primary" : "inherit"}
                        >
                            {showFilters ? "Hide Filters" : "Show Filters"}
                        </Button>
                    </Box>

                    {showFilters && (
                        <Grid container spacing={2} sx={{ mb: 2 }}>
                            <Grid item xs={12} sm={6} md={3}>
                                <FormControl fullWidth size="small">
                                    <InputLabel>Lecturer</InputLabel>
                                    <Select
                                        name="lecturer"
                                        value={filters.lecturer}
                                        onChange={handleFilterChange}
                                        label="Lecturer"
                                    >
                                        <MenuItem value="">All Lecturers</MenuItem>
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
                                        name="batch"
                                        value={filters.batch}
                                        onChange={handleFilterChange}
                                        label="Batch"
                                    >
                                        <MenuItem value="">All Batches</MenuItem>
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
                                    <InputLabel>Classroom</InputLabel>
                                    <Select
                                        name="classroom"
                                        value={filters.classroom}
                                        onChange={handleFilterChange}
                                        label="Classroom"
                                    >
                                        <MenuItem value="">All Classrooms</MenuItem>
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
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                        name="status"
                                        value={filters.status}
                                        onChange={handleFilterChange}
                                        label="Status"
                                    >
                                        <MenuItem value="">All Status</MenuItem>
                                        <MenuItem value="Confirmed">Confirmed</MenuItem>
                                        <MenuItem value="Postponed">Postponed</MenuItem>
                                        <MenuItem value="Cancelled">Cancelled</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    )}

                    {/* Filter Summary */}
                    {(filters.lecturer || filters.batch || filters.classroom || filters.subject || filters.status) && (
                        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                                Filters:
                            </Typography>

                            {filters.lecturer && (
                                <Chip
                                    size="small"
                                    label={`Lecturer: ${lecturers.find(l => l.id === filters.lecturer)?.name}`}
                                    onDelete={() => setFilters(prev => ({ ...prev, lecturer: '' }))}
                                />
                            )}

                            {filters.batch && (
                                <Chip
                                    size="small"
                                    label={`Batch: ${batches.find(b => b.id === filters.batch)?.name}`}
                                    onDelete={() => setFilters(prev => ({ ...prev, batch: '' }))}
                                />
                            )}

                            {filters.classroom && (
                                <Chip
                                    size="small"
                                    label={`Classroom: ${classrooms.find(c => c.id === filters.classroom)?.name}`}
                                    onDelete={() => setFilters(prev => ({ ...prev, classroom: '' }))}
                                />
                            )}

                            {filters.subject && (
                                <Chip
                                    size="small"
                                    label={`Subject: ${filters.subject}`}
                                    onDelete={() => setFilters(prev => ({ ...prev, subject: '' }))}
                                />
                            )}

                            {filters.status && (
                                <Chip
                                    size="small"
                                    label={`Status: ${filters.status}`}
                                    onDelete={() => setFilters(prev => ({ ...prev, status: '' }))}
                                />
                            )}

                            <Button
                                size="small"
                                onClick={clearFilters}
                                startIcon={<RefreshIcon />}
                                variant="text"
                            >
                                Clear All
                            </Button>
                        </Box>
                    )}
                </Box>

                {/* Weekly View */}
                {viewType === 'weekly' && (
                    <Box>
                        <Grid container spacing={2}>
                            {daysOfWeek.map((day) => {
                                const daySlots = getDayTimeSlots(day);
                                const hasClasses = daySlots.length > 0;

                                return (
                                    <Grid item xs={12} sm={6} md={4} lg={3} key={day}>
                                        <Card variant="outlined" sx={{ height: '100%' }}>
                                            <CardContent>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                                    <Typography variant="h6" color={hasClasses ? 'text.primary' : 'text.secondary'}>
                                                        {day}
                                                    </Typography>
                                                    <Badge badgeContent={daySlots.length} color="primary" showZero>
                                                        <ScheduleIcon color={hasClasses ? 'primary' : 'action'} />
                                                    </Badge>
                                                </Box>

                                                <Divider sx={{ mb: 2 }} />

                                                {hasClasses ? (
                                                    <Stack spacing={2}>
                                                        {daySlots.map((slot) => {
                                                            const classroom = classrooms.find(c => c.id === slot.classroom);
                                                            const lecturer = lecturers.find(l => l.id === slot.lecturer);
                                                            const batch = batches.find(b => b.id === slot.batch);

                                                            // Use rescheduled values if postponed
                                                            const displayStartTime = slot.status === 'Postponed' ? slot.rescheduledStartTime : slot.startTime;
                                                            const displayEndTime = slot.status === 'Postponed' ? slot.rescheduledEndTime : slot.endTime;

                                                            return (
                                                                <Box
                                                                    key={slot.id}
                                                                    sx={{
                                                                        p: 1.5,
                                                                        borderRadius: 1,
                                                                        bgcolor: slot.status === 'Postponed' ? '#fff9c4' : '#f5f5f5',
                                                                        border: '1px solid',
                                                                        borderColor: slot.status === 'Postponed' ? '#ffecb3' : '#e0e0e0'
                                                                    }}
                                                                >
                                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                                                        <Typography variant="subtitle2">
                                                                            {slot.subject}
                                                                        </Typography>
                                                                        <Chip
                                                                            size="small"
                                                                            label={slot.status}
                                                                            color={slot.status === 'Confirmed' ? 'success' : 'warning'}
                                                                            variant="outlined"
                                                                        />
                                                                    </Box>

                                                                    <Typography variant="body2" color="text.secondary">
                                                                        {displayStartTime} - {displayEndTime}
                                                                    </Typography>

                                                                    <Typography variant="body2" color="text.secondary">
                                                                        {classroom?.name}
                                                                    </Typography>

                                                                    <Typography variant="body2" color="text.secondary">
                                                                        {lecturer?.name}
                                                                    </Typography>

                                                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                                        {batch?.name}
                                                                    </Typography>

                                                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                                                                        <Tooltip title="Edit">
                                                                            <IconButton
                                                                                size="small"
                                                                                onClick={() => navigate(`/schedule/edit/${slot.id}`)}
                                                                            >
                                                                                <EditIcon fontSize="small" />
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                        <Tooltip title="Delete">
                                                                            <IconButton
                                                                                size="small"
                                                                                onClick={() => handleDelete(slot.id)}
                                                                            >
                                                                                <DeleteIcon fontSize="small" />
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                    </Box>
                                                                </Box>
                                                            );
                                                        })}
                                                    </Stack>
                                                ) : (
                                                    <Box sx={{ textAlign: 'center', py: 4 }}>
                                                        <Typography variant="body2" color="text.secondary">
                                                            No classes scheduled
                                                        </Typography>
                                                        <Button
                                                            size="small"
                                                            sx={{ mt: 1 }}
                                                            onClick={() => {
                                                                navigate('/schedule/new');
                                                            }}
                                                        >
                                                            Add Class
                                                        </Button>
                                                    </Box>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Box>
                )}

                {/* Daily View */}
                {viewType === 'daily' && (
                    <Box>
                        {getDayTimeSlots(currentDay).length > 0 ? (
                            <Grid container spacing={3}>
                                {getDayTimeSlots(currentDay)
                                    .sort((a, b) => {
                                        // Sort by time
                                        const timeA = a.status === 'Postponed' ? a.rescheduledStartTime : a.startTime;
                                        const timeB = b.status === 'Postponed' ? b.rescheduledStartTime : b.startTime;
                                        return timeA.localeCompare(timeB);
                                    })
                                    .map((slot) => {
                                        const classroom = classrooms.find(c => c.id === slot.classroom);
                                        const lecturer = lecturers.find(l => l.id === slot.lecturer);
                                        const batch = batches.find(b => b.id === slot.batch);

                                        // Use rescheduled values if postponed
                                        const displayStartTime = slot.status === 'Postponed' ? slot.rescheduledStartTime : slot.startTime;
                                        const displayEndTime = slot.status === 'Postponed' ? slot.rescheduledEndTime : slot.endTime;

                                        return (
                                            <Grid item xs={12} sm={6} md={4} key={slot.id}>
                                                <Card
                                                    variant="outlined"
                                                    sx={{
                                                        bgcolor: slot.status === 'Postponed' ? '#fff9c4' : 'white',
                                                        borderColor: slot.status === 'Postponed' ? '#ffecb3' : '#e0e0e0'
                                                    }}
                                                >
                                                    <CardContent>
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                                            <Typography variant="h6">
                                                                {slot.subject}
                                                            </Typography>
                                                            <Chip
                                                                label={slot.status}
                                                                color={slot.status === 'Confirmed' ? 'success' : 'warning'}
                                                                size="small"
                                                            />
                                                        </Box>

                                                        <Grid container spacing={2}>
                                                            <Grid item xs={6}>
                                                                <Typography variant="body2" color="text.secondary">Time</Typography>
                                                                <Typography variant="body1">
                                                                    {displayStartTime} - {displayEndTime}
                                                                </Typography>
                                                            </Grid>

                                                            <Grid item xs={6}>
                                                                <Typography variant="body2" color="text.secondary">Classroom</Typography>
                                                                <Typography variant="body1">
                                                                    {classroom?.name}
                                                                </Typography>
                                                            </Grid>

                                                            <Grid item xs={6}>
                                                                <Typography variant="body2" color="text.secondary">Lecturer</Typography>
                                                                <Typography variant="body1">
                                                                    {lecturer?.name}
                                                                </Typography>
                                                            </Grid>

                                                            <Grid item xs={6}>
                                                                <Typography variant="body2" color="text.secondary">Batch</Typography>
                                                                <Typography variant="body1">
                                                                    {batch?.name} ({batch?.students} students)
                                                                </Typography>
                                                            </Grid>

                                                            {slot.notes && (
                                                                <Grid item xs={12}>
                                                                    <Typography variant="body2" color="text.secondary">Notes</Typography>
                                                                    <Typography variant="body2">
                                                                        {slot.notes}
                                                                    </Typography>
                                                                </Grid>
                                                            )}
                                                        </Grid>

                                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 1 }}>
                                                            <Button
                                                                size="small"
                                                                variant="outlined"
                                                                startIcon={<EditIcon />}
                                                                onClick={() => navigate(`/schedule/edit/${slot.id}`)}
                                                            >
                                                                Edit
                                                            </Button>
                                                            <Button
                                                                size="small"
                                                                variant="outlined"
                                                                color="error"
                                                                startIcon={<DeleteIcon />}
                                                                onClick={() => handleDelete(slot.id)}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </Box>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        );
                                    })}
                            </Grid>
                        ) : (
                            <Box sx={{ textAlign: 'center', py: 4 }}>
                                <Typography variant="body1" color="text.secondary">
                                    No classes scheduled for {currentDay}
                                </Typography>
                                <Button
                                    variant="contained"
                                    startIcon={<AddIcon />}
                                    sx={{ mt: 2 }}
                                    onClick={() => navigate('/schedule/new')}
                                >
                                    Schedule New Class
                                </Button>
                            </Box>
                        )}
                    </Box>
                )}
            </Paper>
        </Container>
    );
};

export default FullSchedule;