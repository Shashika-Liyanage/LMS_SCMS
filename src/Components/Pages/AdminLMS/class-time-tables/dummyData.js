// Dummy data for classrooms
export const dummyClassrooms = [
    {
      id: 'CR001',
      name: 'Main Hall 345',
      building: 'Main Building',
      floor: '3rd Floor',
      capacity: 40,
      equipment: 'Projector, Whiteboard',
      status: 'Available'
    },
    {
      id: 'CR002',
      name: 'Lab 234',
      building: 'Extension Building',
      floor: '2nd Floor',
      capacity: 30,
      equipment: 'Computers, Projector',
      status: 'Reserved'
    },
    {
      id: 'CR003',
      name: 'Lecture Hall 101',
      building: 'Science Building',
      floor: '1st Floor',
      capacity: 120,
      equipment: 'Audio System, Projector',
      status: 'Available'
    },
    {
      id: 'CR004',
      name: 'Seminar Room 512',
      building: 'Main Building',
      floor: '5th Floor',
      capacity: 25,
      equipment: 'Smart Board, Video Conference',
      status: 'Reserved'
    }
  ];
  
  // Dummy data for lecturers
  export const dummyLecturers = [
    {
      id: 'L001',
      name: 'Prof. Camal Johnson',
      department: 'Computer Science'
    },
    {
      id: 'L002',
      name: 'Prof. Weer Smith',
      department: 'Computer Science'
    },
    {
      id: 'L003',
      name: 'Dr. Lisa Brown',
      department: 'Mathematics'
    }
  ];
  
  // Dummy data for batches
  export const dummyBatches = [
    {
      id: 'B001',
      name: 'CS2023',
      intakeYear: '2023',
      department: 'Computer Science',
      students: 32
    },
    {
      id: 'B002',
      name: 'CS2024',
      intakeYear: '2024',
      department: 'Computer Science',
      students: 28
    },
    {
      id: 'B003',
      name: 'MT2023',
      intakeYear: '2023',
      department: 'Mathematics',
      students: 25
    }
  ];
  
  // Dummy data for time slots
  export const dummyTimeSlots = [
    {
      id: 'TS001',
      day: 'Monday',
      startTime: '09:00',
      endTime: '11:00',
      classroom: 'CR001',
      subject: 'Advanced Database Systems',
      lecturer: 'L001',
      batch: 'B001',
      status: 'Confirmed'
    },
    {
      id: 'TS002',
      day: 'Wednesday',
      startTime: '08:00',
      endTime: '12:00',
      classroom: 'CR002',
      subject: 'Frontend Development',
      lecturer: 'L002',
      batch: 'B001',
      status: 'Postponed',
      rescheduledDay: 'Friday',
      rescheduledStartTime: '08:00',
      rescheduledEndTime: '12:00',
      rescheduledDate: '2025-03-21'
    },
    {
      id: 'TS003',
      day: 'Tuesday',
      startTime: '14:00',
      endTime: '16:00',
      classroom: 'CR003',
      subject: 'Calculus II',
      lecturer: 'L003',
      batch: 'B003',
      status: 'Confirmed'
    }
  ];
  
  // Days of the week
  export const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];
  
  // Time slots for selection
  export const timeOptions = [
    '07:00', '07:30', '08:00', '08:30', '09:00', '09:30',
    '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
    '19:00', '19:30', '20:00'
  ];