// dummyData.js
import { format, addDays, parseISO, isToday, isSameDay, startOfDay, addWeeks, isBefore, isAfter } from 'date-fns';

// Dummy data for classrooms
export const dummyClassrooms = [
    { id: 'CR001', name: 'Main Hall 345', building: 'Main Building', floor: '3rd Floor', capacity: 40, equipment: 'Projector, Whiteboard', status: 'Available' },
    { id: 'CR002', name: 'Lab 234', building: 'Extension Building', floor: '2nd Floor', capacity: 30, equipment: 'Computers, Projector', status: 'Reserved' },
    { id: 'CR003', name: 'Lecture Hall 101', building: 'Science Building', floor: '1st Floor', capacity: 120, equipment: 'Audio System, Projector', status: 'Available' },
    { id: 'CR004', name: 'Seminar Room 512', building: 'Main Building', floor: '5th Floor', capacity: 25, equipment: 'Smart Board, Video Conference', status: 'Reserved' },
    { id: 'CR005', name: 'Study Room 205', building: 'Extension Building', floor: '2nd Floor', capacity: 20, equipment: 'Whiteboard', status: 'Available' },
    { id: 'CR006', name: 'Conference Room 621', building: 'Main Building', floor: '6th Floor', capacity: 35, equipment: 'Projector, Audio System, Video Conference', status: 'Available' }
];

// Dummy data for lecturers
export const dummyLecturers = [
    { id: 'L001', name: 'Prof. Camal Johnson', department: 'Computer Science' },
    { id: 'L002', name: 'Prof. Weer Smith', department: 'Computer Science' },
    { id: 'L003', name: 'Dr. Lisa Brown', department: 'Mathematics' },
    { id: 'L004', name: 'Dr. Mark Thompson', department: 'Physics' },
    { id: 'L005', name: 'Prof. Sarah Wilson', department: 'Software Engineering' },
    { id: 'L006', name: 'Dr. James Lee', department: 'Data Science' }
];

// Dummy data for batches
export const dummyBatches = [
    { id: 'B001', name: 'CS2023', intakeYear: '2023', department: 'Computer Science', students: 32 },
    { id: 'B002', name: 'CS2024', intakeYear: '2024', department: 'Computer Science', students: 28 },
    { id: 'B003', name: 'MT2023', intakeYear: '2023', department: 'Mathematics', students: 25 },
    { id: 'B004', name: 'DS2024', intakeYear: '2024', department: 'Data Science', students: 35 },
    { id: 'B005', name: 'SE2023', intakeYear: '2023', department: 'Software Engineering', students: 30 },
    { id: 'B006', name: 'PH2024', intakeYear: '2024', department: 'Physics', students: 22 }
];

// Generate a more comprehensive list of subjects
export const dummySubjects = [
    { id: 'S001', name: 'Advanced Database Systems', department: 'Computer Science' },
    { id: 'S002', name: 'Frontend Development', department: 'Computer Science' },
    { id: 'S003', name: 'Calculus II', department: 'Mathematics' },
    { id: 'S004', name: 'Data Structures', department: 'Computer Science' },
    { id: 'S005', name: 'Machine Learning', department: 'Data Science' },
    { id: 'S006', name: 'Quantum Physics', department: 'Physics' },
    { id: 'S007', name: 'Software Testing', department: 'Software Engineering' },
    { id: 'S008', name: 'Algorithms', department: 'Computer Science' },
    { id: 'S009', name: 'Statistical Methods', department: 'Mathematics' },
    { id: 'S010', name: 'Cloud Computing', department: 'Computer Science' }
];

// Days of the week
export const daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];

// Time slots for selection
export const timeOptions = [
    '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'
];

// Generate comprehensive time slots with random variations for the past week, current week, and next week
const generateTimeSlots = () => {
    const today = new Date();
    const startDate = addDays(today, -7); // Start from a week ago

    const timeSlots = [];
    let idCounter = 1;

    // Generate slots for past week, current week, and next two weeks
    for (let day = 0; day < 28; day++) {
        const currentDate = addDays(startDate, day);
        const dayName = format(currentDate, 'EEEE');
        const dateString = format(currentDate, 'yyyy-MM-dd');

        // Skip weekends for realistic class schedule
        if (dayName === 'Saturday' || dayName === 'Sunday') continue;

        // Generate 4-6 classes per day
        const classesPerDay = Math.floor(Math.random() * 3) + 4;

        for (let i = 0; i < classesPerDay; i++) {
            // Randomly select time, classroom, lecturer, batch, and subject
            const startTimeIndex = Math.floor(Math.random() * (timeOptions.length - 4));
            const startTime = timeOptions[startTimeIndex];
            const duration = [2, 4][Math.floor(Math.random() * 2)]; // Either 1 hour or 2 hours
            const endTimeIndex = startTimeIndex + duration;
            const endTime = timeOptions[endTimeIndex];

            const classroomIndex = Math.floor(Math.random() * dummyClassrooms.length);
            const classroom = dummyClassrooms[classroomIndex];

            const lecturerIndex = Math.floor(Math.random() * dummyLecturers.length);
            const lecturer = dummyLecturers[lecturerIndex];

            const batchIndex = Math.floor(Math.random() * dummyBatches.length);
            const batch = dummyBatches[batchIndex];

            const subjectIndex = Math.floor(Math.random() * dummySubjects.length);
            const subject = dummySubjects[subjectIndex];

            // Randomly determine if a class is postponed (10% chance)
            const isPostponed = Math.random() < 0.1;

            const timeSlot = {
                id: `TS${String(idCounter).padStart(3, '0')}`,
                day: dayName,
                date: dateString,
                startTime: startTime,
                endTime: endTime,
                classroom: classroom.id,
                classroomName: classroom.name,
                building: classroom.building,
                capacity: classroom.capacity,
                equipment: classroom.equipment,
                subject: subject.name,
                subjectId: subject.id,
                department: subject.department,
                lecturer: lecturer.id,
                lecturerName: lecturer.name,
                lecturerDepartment: lecturer.department,
                batch: batch.id,
                batchName: batch.name,
                students: batch.students,
                status: isPostponed ? 'Postponed' : 'Confirmed'
            };

            // If postponed, add rescheduling information
            if (isPostponed) {
                // Reschedule to 1-5 days in the future
                const rescheduleDate = addDays(currentDate, Math.floor(Math.random() * 5) + 1);
                timeSlot.rescheduledDay = format(rescheduleDate, 'EEEE');
                timeSlot.rescheduledDate = format(rescheduleDate, 'yyyy-MM-dd');
                timeSlot.rescheduledStartTime = startTime;
                timeSlot.rescheduledEndTime = endTime;
            }

            timeSlots.push(timeSlot);
            idCounter++;
        }
    }

    return timeSlots;
};

// Generate time slots once and export them
export const dummyTimeSlots = generateTimeSlots();

// Function to convert time slots to TUI Calendar events
export const generateTimeTableEvents = () => {
    return dummyTimeSlots.map(slot => {
        // Create event for TUI Calendar
        const startDateTime = `${slot.date}T${slot.startTime}:00`;
        const endDateTime = `${slot.date}T${slot.endTime}:00`;

        const event = {
            id: slot.id,
            calendarId: slot.status,
            title: slot.subject,
            body: `Lecturer: ${slot.lecturerName}<br>Batch: ${slot.batchName}<br>Room: ${slot.classroomName}`,
            location: slot.classroomName,
            start: startDateTime,
            end: endDateTime,
            isReadOnly: true,
            state: slot.status,
            category: 'time',
            customStyle: {
                backgroundColor: slot.status === 'Confirmed' ? '#4CAF50' : '#FF9800',
                borderColor: slot.status === 'Confirmed' ? '#4CAF50' : '#FF9800',
            },
            raw: {
                ...slot
            }
        };

        // If postponed, create a separate event for the rescheduled session
        if (slot.status === 'Postponed') {
            const rescheduledStartDateTime = `${slot.rescheduledDate}T${slot.rescheduledStartTime}:00`;
            const rescheduledEndDateTime = `${slot.rescheduledDate}T${slot.rescheduledEndTime}:00`;

            const rescheduledEvent = {
                id: `${slot.id}-rescheduled`,
                calendarId: 'Confirmed',
                title: `${slot.subject} (Rescheduled)`,
                body: `Lecturer: ${slot.lecturerName}<br>Batch: ${slot.batchName}<br>Room: ${slot.classroomName}<br>Rescheduled from: ${slot.date}`,
                location: slot.classroomName,
                start: rescheduledStartDateTime,
                end: rescheduledEndDateTime,
                isReadOnly: true,
                state: 'Rescheduled',
                category: 'time',
                customStyle: {
                    backgroundColor: '#4CAF50',
                    borderColor: '#4CAF50',
                    borderStyle: 'dashed'
                },
                raw: {
                    ...slot,
                    isRescheduled: true
                }
            };

            return [event, rescheduledEvent];
        }

        return event;
    }).flat(); // Flatten the array to handle the rescheduled events
};

// Get upcoming lectures (next 7 days excluding today)
export const getUpcomingLectures = () => {
    const today = startOfDay(new Date());
    const oneWeekLater = addDays(today, 7);

    return dummyTimeSlots.filter(slot => {
        const slotDate = parseISO(slot.date);
        return isAfter(slotDate, today) && isBefore(slotDate, oneWeekLater);
    }).sort((a, b) => {
        // Sort by date first
        const dateA = parseISO(a.date);
        const dateB = parseISO(b.date);

        if (dateA < dateB) return -1;
        if (dateA > dateB) return 1;

        // If same date, sort by time
        return a.startTime.localeCompare(b.startTime);
    }).slice(0, 5); // Show only the next 5 lectures
};

// Get today's lectures
export const getTodayLectures = () => {
    const today = new Date();
    const todayStr = format(today, 'yyyy-MM-dd');

    return dummyTimeSlots.filter(slot => slot.date === todayStr)
        .sort((a, b) => a.startTime.localeCompare(b.startTime));
};

// Search lectures by date
export const searchLecturesByDate = (date) => {
    const searchDate = format(date, 'yyyy-MM-dd');

    return dummyTimeSlots.filter(slot => slot.date === searchDate)
        .sort((a, b) => a.startTime.localeCompare(b.startTime));
};