import React, { useState, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {
    Box,
    Typography,
    Container,
    Paper,
    TextField,
    InputAdornment,
    IconButton,
    Chip,
    Divider,
    Grid,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemText,
    Badge
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { format, parseISO, isToday, addDays, isSameDay } from 'date-fns';
import SearchIcon from '@mui/icons-material/Search';
import EventIcon from '@mui/icons-material/Event';
import RoomIcon from '@mui/icons-material/Room';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import BookIcon from '@mui/icons-material/Book';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WarningIcon from '@mui/icons-material/Warning';

// Importing dummy data
import {
    generateTimeTableEvents,
    getUpcomingLectures,
    getTodayLectures,
    searchLecturesByDate
} from './timeutils';

const TimeTable = () => {
    const calendarRef = useRef(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [searchResults, setSearchResults] = useState([]);
    const [upcomingLectures, setUpcomingLectures] = useState([]);
    const [todayLectures, setTodayLectures] = useState([]);
    const [calendarView, setCalendarView] = useState('timeGridWeek');

    // Convert toast-ui events to FullCalendar format
    const convertEvents = () => {
        const events = generateTimeTableEvents();
        return events.map(event => ({
            id: event.id,
            title: event.title,
            start: event.start,
            end: event.end,
            extendedProps: {
                location: event.location,
                status: event.calendarId,
                lecturer: event.raw?.lecturerName,
                batch: event.raw?.batchName,
                students: event.raw?.students,
                department: event.raw?.department,
                building: event.raw?.building,
                classroomName: event.raw?.classroomName,
                capacity: event.raw?.capacity,
                isRescheduled: event.raw?.isRescheduled,
                originalDate: event.raw?.date
            },
            backgroundColor: event.status === 'Postponed' ? '#FF9800' : '#4CAF50',
            borderColor: event.status === 'Postponed' ? '#FF9800' : '#4CAF50',
            textColor: '#ffffff',
        }));
    };

    const fullCalendarEvents = convertEvents();

    // Initialize data on component mount
    useEffect(() => {
        // Set initial upcoming lectures
        setUpcomingLectures(getUpcomingLectures());

        // Set today's lectures
        setTodayLectures(getTodayLectures());

        // Initialize search results with today's date
        handleDateSearch(new Date());
    }, []);

    // Handle date search
    const handleDateSearch = (date) => {
        setSelectedDate(date);
        const results = searchLecturesByDate(date);
        setSearchResults(results);

        // Update calendar to show the selected date
        if (calendarRef.current) {
            calendarRef.current.getApi().gotoDate(date);
            // Switch to day view when a specific date is selected
            calendarRef.current.getApi().changeView('timeGridDay');
            setCalendarView('timeGridDay');
        }
    };

    // Format time slots for display
    const formatTimeSlot = (startTime, endTime) => {
        return `${startTime} - ${endTime}`;
    };

    // Render event status chip
    const renderStatusChip = (status) => {
        if (status === 'Confirmed') {
            return <Chip size="small" label={status} color="success" />;
        } else if (status === 'Postponed') {
            return <Chip size="small" label={status} color="warning" icon={<WarningIcon />} />;
        }
        return <Chip size="small" label={status} color="default" />;
    };

    // Handle calendar event click
    const handleEventClick = (info) => {
        const { event } = info;
        console.log('Event clicked:', event);
        alert(`
      ${event.title}
      Lecturer: ${event.extendedProps.lecturer}
      Location: ${event.extendedProps.location}
      Status: ${event.extendedProps.status}
      ${event.extendedProps.isRescheduled ? `Rescheduled from: ${event.extendedProps.originalDate}` : ''}
    `);
        // You can implement a modal or drawer to show detailed information
    };

    // Render event content
    const renderEventContent = (eventInfo) => {
        return (
            <>
                <b>{eventInfo.timeText}</b>
                <i>{eventInfo.event.title}</i>
                <div>
                    <small>{eventInfo.event.extendedProps.lecturer}</small>
                    <br />
                    <small>{eventInfo.event.extendedProps.location}</small>
                </div>
            </>
        );
    };

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Course Timetable
                </Typography>

                <Grid container spacing={3}>
                    {/* Date Search Section */}
                    <Grid item xs={12} md={4}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Search by Date"
                                value={selectedDate}
                                onChange={handleDateSearch}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        fullWidth
                                        variant="outlined"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton>
                                                        <SearchIcon />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                )}
                            />
                        </LocalizationProvider>
                    </Grid>
{/* 
                    {/*
                    <Grid item xs={12} md={8} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Chip
                                label="Day View"
                                clickable
                                color={calendarView === 'timeGridDay' ? 'primary' : 'default'}
                                onClick={() => {
                                    setCalendarView('timeGridDay');
                                    calendarRef.current.getApi().changeView('timeGridDay');
                                }}
                            />
                            <Chip
                                label="Week View"
                                clickable
                                color={calendarView === 'timeGridWeek' ? 'primary' : 'default'}
                                onClick={() => {
                                    setCalendarView('timeGridWeek');
                                    calendarRef.current.getApi().changeView('timeGridWeek');
                                }}
                            />
                            <Chip
                                label="Month View"
                                clickable
                                color={calendarView === 'dayGridMonth' ? 'primary' : 'default'}
                                onClick={() => {
                                    setCalendarView('dayGridMonth');
                                    calendarRef.current.getApi().changeView('dayGridMonth');
                                }}
                            />
                        </Box>
                    </Grid> */}
                </Grid>

                {/* Calendar Component */}
                <Box sx={{ height: '500px', mt: 3 }}>
                    <FullCalendar
                        ref={calendarRef}
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView={calendarView}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'timeGridDay,timeGridWeek,dayGridMonth'
                        }}
                        events={fullCalendarEvents}
                        eventClick={handleEventClick}
                        eventContent={renderEventContent}
                        slotMinTime="07:00:00"
                        slotMaxTime="21:00:00"
                        allDaySlot={false}
                        height="100%"
                        firstDay={1}
                        nowIndicator={true}
                        businessHours={{
                            daysOfWeek: [1, 2, 3, 4, 5],
                            startTime: '07:00',
                            endTime: '21:00',
                        }}
                        eventTimeFormat={{
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false
                        }}
                    />
                </Box>
            </Paper>

            {/* Search Results */}
            {searchResults.length > 0 && (
                <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                    <Typography variant="h5" gutterBottom>
                        Lectures on {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                    </Typography>
                    <Divider sx={{ mb: 2 }} />

                    <Grid container spacing={2}>
                        {searchResults.map((lecture) => (
                            <Grid item xs={12} md={6} lg={4} key={lecture.id}>
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            {lecture.subject}
                                            <Box component="span" sx={{ ml: 1 }}>
                                                {renderStatusChip(lecture.status)}
                                            </Box>
                                        </Typography>

                                        <List dense>
                                            <ListItem>
                                                <AccessTimeIcon fontSize="small" sx={{ mr: 1 }} />
                                                <ListItemText
                                                    primary={formatTimeSlot(lecture.startTime, lecture.endTime)}
                                                />
                                            </ListItem>

                                            <ListItem>
                                                <RoomIcon fontSize="small" sx={{ mr: 1 }} />
                                                <ListItemText
                                                    primary={`${lecture.classroomName} (${lecture.building})`}
                                                    secondary={`Capacity: ${lecture.capacity}`}
                                                />
                                            </ListItem>

                                            <ListItem>
                                                <PersonIcon fontSize="small" sx={{ mr: 1 }} />
                                                <ListItemText
                                                    primary={lecture.lecturerName}
                                                    secondary={lecture.department}
                                                />
                                            </ListItem>

                                            <ListItem>
                                                <GroupIcon fontSize="small" sx={{ mr: 1 }} />
                                                <ListItemText
                                                    primary={lecture.batchName}
                                                    secondary={`${lecture.students} students`}
                                                />
                                            </ListItem>

                                            {lecture.status === 'Postponed' && (
                                                <ListItem>
                                                    <WarningIcon fontSize="small" sx={{ mr: 1, color: 'warning.main' }} />
                                                    <ListItemText
                                                        primary="Rescheduled to:"
                                                        secondary={`${lecture.rescheduledDay}, ${lecture.rescheduledDate} at ${formatTimeSlot(lecture.rescheduledStartTime, lecture.rescheduledEndTime)}`}
                                                    />
                                                </ListItem>
                                            )}
                                        </List>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
            )}

            {/* Today's Lectures and Upcoming Lectures - Displayed side by side */}
            <Grid container spacing={3}>
                {/* Today's Lectures */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                        <Typography variant="h5" gutterBottom>
                            Today's Lectures
                            <Badge badgeContent={todayLectures.length} color="primary" sx={{ ml: 2 }} />
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        {todayLectures.length > 0 ? (
                            <List>
                                {todayLectures.map((lecture) => (
                                    <ListItem key={lecture.id} sx={{ mb: 1, bgcolor: 'background.default', borderRadius: 1 }}>
                                        <ListItemText
                                            primary={
                                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <Typography variant="subtitle1">{lecture.subject}</Typography>
                                                    {renderStatusChip(lecture.status)}
                                                </Box>
                                            }
                                            secondary={
                                                <>
                                                    <Typography variant="body2" component="span" display="block">
                                                        <AccessTimeIcon fontSize="inherit" sx={{ mr: 0.5, verticalAlign: 'middle' }} />
                                                        {formatTimeSlot(lecture.startTime, lecture.endTime)}
                                                    </Typography>
                                                    <Typography variant="body2" component="span" display="block">
                                                        <RoomIcon fontSize="inherit" sx={{ mr: 0.5, verticalAlign: 'middle' }} />
                                                        {lecture.classroomName}
                                                    </Typography>
                                                    <Typography variant="body2" component="span" display="block">
                                                        <PersonIcon fontSize="inherit" sx={{ mr: 0.5, verticalAlign: 'middle' }} />
                                                        {lecture.lecturerName}
                                                    </Typography>
                                                </>
                                            }
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                            <Typography variant="body1" color="textSecondary" align="center" sx={{ mt: 3 }}>
                                No lectures scheduled for today.
                            </Typography>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
};

export default TimeTable;