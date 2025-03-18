import React, { createContext, useState, useContext } from 'react';

// Import dummy data from data file
import { 
  dummyClassrooms, 
  dummyLecturers, 
  dummyBatches, 
  dummyTimeSlots, 
  daysOfWeek, 
  timeOptions 
} from './dummyData';

// Create context
const ScheduleContext = createContext();

export const useSchedule = () => {
  return useContext(ScheduleContext);
};

export const ScheduleProvider = ({ children }) => {
  const [classrooms, setClassrooms] = useState(dummyClassrooms);
  const [lecturers, setLecturers] = useState(dummyLecturers);
  const [batches, setBatches] = useState(dummyBatches);
  const [timeSlots, setTimeSlots] = useState(dummyTimeSlots);

  // Add a new time slot
  const addTimeSlot = (newTimeSlot) => {
    // Generate a new ID
    const newId = `TS${String(timeSlots.length + 1).padStart(3, '0')}`;
    const timeSlotWithId = { ...newTimeSlot, id: newId, status: 'Confirmed' };
    setTimeSlots([...timeSlots, timeSlotWithId]);
    return timeSlotWithId;
  };

  // Update an existing time slot
  const updateTimeSlot = (id, updatedData) => {
    const updatedTimeSlots = timeSlots.map(slot => 
      slot.id === id ? { ...slot, ...updatedData } : slot
    );
    setTimeSlots(updatedTimeSlots);
    return updatedTimeSlots.find(slot => slot.id === id);
  };

  // Delete a time slot
  const deleteTimeSlot = (id) => {
    const updatedTimeSlots = timeSlots.filter(slot => slot.id !== id);
    setTimeSlots(updatedTimeSlots);
  };

  // Reschedule a time slot
  const rescheduleTimeSlot = (id, rescheduledData) => {
    const updatedTimeSlots = timeSlots.map(slot => 
      slot.id === id ? { 
        ...slot, 
        status: 'Postponed',
        rescheduledDay: rescheduledData.day,
        rescheduledStartTime: rescheduledData.startTime,
        rescheduledEndTime: rescheduledData.endTime,
        rescheduledDate: rescheduledData.date
      } : slot
    );
    setTimeSlots(updatedTimeSlots);
    return updatedTimeSlots.find(slot => slot.id === id);
  };

  // Check for classroom availability
  const checkClassroomAvailability = (classroomId, day, startTime, endTime, excludeTimeSlotId = null) => {
    // Convert times to numbers for easier comparison
    const start = Number(startTime.replace(':', ''));
    const end = Number(endTime.replace(':', ''));

    const conflictingSlots = timeSlots.filter(slot => {
      if (excludeTimeSlotId && slot.id === excludeTimeSlotId) return false;
      if (slot.classroom !== classroomId || slot.day !== day) return false;
      
      const slotStart = Number(slot.startTime.replace(':', ''));
      const slotEnd = Number(slot.endTime.replace(':', ''));
      
      // Check if time ranges overlap
      return (start < slotEnd && end > slotStart);
    });
    
    return conflictingSlots.length === 0;
  };

  // Check for lecturer availability
  const checkLecturerAvailability = (lecturerId, day, startTime, endTime, excludeTimeSlotId = null) => {
    const start = Number(startTime.replace(':', ''));
    const end = Number(endTime.replace(':', ''));

    const conflictingSlots = timeSlots.filter(slot => {
      if (excludeTimeSlotId && slot.id === excludeTimeSlotId) return false;
      if (slot.lecturer !== lecturerId || slot.day !== day) return false;
      
      const slotStart = Number(slot.startTime.replace(':', ''));
      const slotEnd = Number(slot.endTime.replace(':', ''));
      
      return (start < slotEnd && end > slotStart);
    });
    
    return conflictingSlots.length === 0;
  };

  // Check for batch availability
  const checkBatchAvailability = (batchId, day, startTime, endTime, excludeTimeSlotId = null) => {
    const start = Number(startTime.replace(':', ''));
    const end = Number(endTime.replace(':', ''));

    const conflictingSlots = timeSlots.filter(slot => {
      if (excludeTimeSlotId && slot.id === excludeTimeSlotId) return false;
      if (slot.batch !== batchId || slot.day !== day) return false;
      
      const slotStart = Number(slot.startTime.replace(':', ''));
      const slotEnd = Number(slot.endTime.replace(':', ''));
      
      return (start < slotEnd && end > slotStart);
    });
    
    return conflictingSlots.length === 0;
  };

  // Get time slots for a specific classroom
  const getClassroomTimeSlots = (classroomId) => {
    return timeSlots.filter(slot => slot.classroom === classroomId);
  };

  // Get time slots for a specific lecturer
  const getLecturerTimeSlots = (lecturerId) => {
    return timeSlots.filter(slot => slot.lecturer === lecturerId);
  };

  // Get time slots for a specific batch
  const getBatchTimeSlots = (batchId) => {
    return timeSlots.filter(slot => slot.batch === batchId);
  };

  const value = {
    classrooms,
    lecturers,
    batches,
    timeSlots,
    daysOfWeek,
    timeOptions,
    addTimeSlot,
    updateTimeSlot,
    deleteTimeSlot,
    rescheduleTimeSlot,
    checkClassroomAvailability,
    checkLecturerAvailability,
    checkBatchAvailability,
    getClassroomTimeSlots,
    getLecturerTimeSlots,
    getBatchTimeSlots
  };

  return (
    <ScheduleContext.Provider value={value}>
      {children}
    </ScheduleContext.Provider>
  );
};