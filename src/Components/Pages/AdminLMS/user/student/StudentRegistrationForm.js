import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  Avatar,
  Tooltip,
  IconButton
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { v4 as uuidv4 } from 'uuid';
import { saveUser, checkUserExists } from '../../../../../service/firebase/user.service';
import { CircularProgress, Alert, Snackbar, Backdrop } from '@mui/material';
import {  sendEmail} from '../../../../../service/mail/email.service'

// Dummy data
const departments = [
  { id: 1, name: 'Computer Science' },
  { id: 2, name: 'Engineering' },
  { id: 3, name: 'Business' },
];

const facultyData = [
  {
    id: 1,
    name: 'Faculty of Technology',
    degrees: [
      {
        id: 1,
        name: 'BSc in Computer Science',
        courses: ['Programming Fundamentals', 'Data Structures', 'Algorithms']
      },
      {
        id: 2,
        name: 'BSc in Information Systems',
        courses: ['Database Management', 'System Analysis', 'Web Development']
      }
    ]
  },
  {
    id: 2,
    name: 'Faculty of Engineering',
    degrees: [
      {
        id: 3,
        name: 'BEng in Civil Engineering',
        courses: ['Structural Analysis', 'Fluid Mechanics', 'Construction Materials']
      },
      {
        id: 4,
        name: 'BEng in Electrical Engineering',
        courses: ['Circuit Theory', 'Power Systems', 'Electronics']
      }
    ]
  }
];

const academicYears = ['2023-2024', '2024-2025', '2025-2026'];

// Function to generate a secure password
const generatePassword = () => {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const special = '!@#$%^&*()_+';

  const allChars = lowercase + uppercase + numbers + special;
  let password = '';

  // Ensure at least one character from each category
  password += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
  password += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
  password += numbers.charAt(Math.floor(Math.random() * numbers.length));
  password += special.charAt(Math.floor(Math.random() * special.length));

  // Add more random characters to reach desired length (12 characters total)
  for (let i = 0; i < 8; i++) {
    password += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }

  // Shuffle the password characters
  return password.split('').sort(() => 0.5 - Math.random()).join('');
};

const StudentRegistrationForm = () => {
  const [studentData, setStudentData] = useState({
    studentId: `STD-${uuidv4().slice(0, 8)}`,
    fullName: '',
    email: '',
    contact: '',
    dob: null,
    department: '',
    faculty: '',
    degree: '',
    course: '',
    academicYear: '',
    enrollDate: new Date(),
    guardianName: '',
    guardianContact: '',
    profilePicture: null,
    username: '',
    role: 'student',
    password: generatePassword()
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const handleCloseSnackbar = () => setOpenSnackbar(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);


  const [availableDegrees, setAvailableDegrees] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [profilePreview, setProfilePreview] = useState(null);
  const [copyTooltip, setCopyTooltip] = useState('Copy to clipboard');

  // Generate username when name and email are provided
  useEffect(() => {
    if (studentData.fullName && studentData.email) {
      const namePart = studentData.fullName.split(' ')[0].toLowerCase();
      const emailPart = studentData.email.split('@')[0];
      setStudentData({
        ...studentData,
        username: `${namePart}.${emailPart}`
      });
    }
  }, [studentData.fullName, studentData.email]);

  // Update available degrees when faculty changes
  useEffect(() => {
    if (studentData.faculty) {
      const selectedFaculty = facultyData.find(f => f.name === studentData.faculty);
      if (selectedFaculty) {
        setAvailableDegrees(selectedFaculty.degrees);
        setStudentData({
          ...studentData,
          degree: '',
          course: ''
        });
      }
    } else {
      setAvailableDegrees([]);
    }
  }, [studentData.faculty]);

  // Update available courses when degree changes
  useEffect(() => {
    if (studentData.degree) {
      const selectedFaculty = facultyData.find(f => f.name === studentData.faculty);
      if (selectedFaculty) {
        const selectedDegree = selectedFaculty.degrees.find(d => d.name === studentData.degree);
        if (selectedDegree) {
          setAvailableCourses(selectedDegree.courses);
          setStudentData({
            ...studentData,
            course: ''
          });
        }
      }
    } else {
      setAvailableCourses([]);
    }
  }, [studentData.degree]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({
      ...studentData,
      [name]: value
    });
  };

  const handleDateChange = (name, date) => {
    setStudentData({
      ...studentData,
      [name]: date
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setStudentData({
        ...studentData,
        profilePicture: file
      });

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const copyPasswordToClipboard = () => {
    navigator.clipboard.writeText(studentData.password).then(() => {
      setCopyTooltip('Copied!');
      setTimeout(() => setCopyTooltip('Copy to clipboard'), 2000);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      // Check if user already exists
      const userExists = await checkUserExists(studentData.email, studentData.username);

      if (userExists.exists) {
        setError(`A user with this ${userExists.field} already exists`);
        setLoading(false);
        return;
      }

      const savedStudent = await saveUser(studentData);

      try {
        const templateParams = {
          to_name: studentData.fullName,
          username: studentData.studentId,
          password: studentData.password,
          message: `Please change your password upon your first login for security purposes.`,
          email:studentData.email
      };

        await sendEmail(
          templateParams           
        );

        console.log('Credentials email sent successfully');
      } catch (emailErr) {
        console.error('Failed to send credentials email:', emailErr);
        // You may want to show a warning that the user was created but email failed
        setOpenSnackbar(true);
        //setSnackbarMessage('Student registered successfully but failed to send credentials email.');
        //setSnackbarSeverity('warning');
      }

      setSuccess(true);
      setOpenSnackbar(true);
      //setSnackbarMessage('Student registered successfully!');
      //setSnackbarSeverity('success');
      console.log('Student saved successfully:', savedStudent);

      // Reset form
      setStudentData({
        studentId: `STD-${uuidv4().slice(0, 8)}`,
        fullName: '',
        email: '',
        contact: '',
        dob: null,
        department: '',
        faculty: '',
        degree: '',
        course: '',
        academicYear: '',
        enrollDate: new Date(),
        guardianName: '',
        guardianContact: '',
        username: '',
        password: generatePassword(),
        role: 'student'
      });
    } catch (err) {
      setError('Failed to register student. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Student Registration
        </Typography>

        {error && <Alert severity="error" sx={{ mt: 2, mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Student ID */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Student ID"
                name="studentId"
                value={studentData.studentId}
                disabled
                variant="filled"
                helperText="Auto-generated"
              />
            </Grid>

            {/* Full Name */}
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                label="Full Name"
                name="fullName"
                value={studentData.fullName}
                onChange={handleChange}
                helperText="Enter your full name as it appears on official documents"
              />
            </Grid>

            {/* Email */}
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={studentData.email}
                onChange={handleChange}
              />
            </Grid>

            {/* Contact */}
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                label="Contact Number"
                name="contact"
                value={studentData.contact}
                onChange={handleChange}
              />
            </Grid>

            {/* Department */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Department</InputLabel>
                <Select
                  name="department"
                  value={studentData.department}
                  onChange={handleChange}
                  label="Department"
                >
                  {departments.map((dept) => (
                    <MenuItem key={dept.id} value={dept.name}>
                      {dept.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Faculty */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Faculty</InputLabel>
                <Select
                  name="faculty"
                  value={studentData.faculty}
                  onChange={handleChange}
                  label="Faculty"
                >
                  {facultyData.map((faculty) => (
                    <MenuItem key={faculty.id} value={faculty.name}>
                      {faculty.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Degree Programme */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required disabled={!studentData.faculty}>
                <InputLabel>Degree Programme</InputLabel>
                <Select
                  name="degree"
                  value={studentData.degree}
                  onChange={handleChange}
                  label="Degree Programme"
                >
                  {availableDegrees.map((degree) => (
                    <MenuItem key={degree.id} value={degree.name}>
                      {degree.name}
                    </MenuItem>
                  ))}
                </Select>
                {!studentData.faculty && <FormHelperText>Select a faculty first</FormHelperText>}
              </FormControl>
            </Grid>

            {/* Course */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required disabled={!studentData.degree}>
                <InputLabel>Course</InputLabel>
                <Select
                  name="course"
                  value={studentData.course}
                  onChange={handleChange}
                  label="Course"
                >
                  {availableCourses.map((course, index) => (
                    <MenuItem key={index} value={course}>
                      {course}
                    </MenuItem>
                  ))}
                </Select>
                {!studentData.degree && <FormHelperText>Select a degree first</FormHelperText>}
              </FormControl>
            </Grid>

            {/* Academic Year */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Academic Year</InputLabel>
                <Select
                  name="academicYear"
                  value={studentData.academicYear}
                  onChange={handleChange}
                  label="Academic Year"
                >
                  {academicYears.map((year, index) => (
                    <MenuItem key={index} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Enrollment Date */}
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Enrollment Date"
                  value={studentData.enrollDate}
                  onChange={(date) => handleDateChange('enrollDate', date)}
                  renderInput={(params) => <TextField {...params} fullWidth required />}
                />
              </LocalizationProvider>
            </Grid>

            {/* Guardian Contact */}
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                label="Guardian Contact"
                name="guardianContact"
                value={studentData.guardianContact}
                onChange={handleChange}
              />
            </Grid>

            {/* Profile Picture */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Profile Picture
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Avatar
                    src={profilePreview}
                    sx={{ width: 100, height: 100 }}
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    component="label"
                    sx={{ mt: 1 }}
                  >
                    Upload Photo
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            {/* Username */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={studentData.username}
                disabled
                variant="filled"
                helperText="Auto-generated from name and email"
              />
            </Grid>

            {/* Auto-generated Password */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="text" // Changed to text so the user can see the generated password
                value={studentData.password}
                disabled
                variant="filled"
                helperText="Auto-generated secure password"
                InputProps={{
                  endAdornment: (
                    <Tooltip title={copyTooltip} arrow>
                      <IconButton onClick={copyPasswordToClipboard} edge="end">
                        <ContentCopyIcon />
                      </IconButton>
                    </Tooltip>
                  ),
                }}
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
              >
                Register Student
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Success Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Student registered successfully!
        </Alert>
      </Snackbar>

      {/* Full screen overlay loader */}
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'rgba(0, 0, 0, 0.7)'
        }}
        open={loading}
      >
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2
        }}>
          <CircularProgress color="primary" size={60} />
          <Typography variant="h6">Processing...</Typography>
        </Box>
      </Backdrop>
    </Container>
  );
};

export default StudentRegistrationForm;