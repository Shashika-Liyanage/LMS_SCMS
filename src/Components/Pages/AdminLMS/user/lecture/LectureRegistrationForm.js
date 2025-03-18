import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  IconButton
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { v4 as uuidv4 } from 'uuid';
import { saveUser, checkUserExists } from '../../../../../service/firebase/user.service';
import { CircularProgress, Alert, Snackbar, Backdrop } from '@mui/material';
import { sendEmail } from '../../../../../service/mail/email.service'


// Dummy data
const departments = [
  { id: 1, name: 'Computer Science' },
  { id: 2, name: 'Engineering' },
  { id: 3, name: 'Business' },
];

const facultyData = [
  { id: 1, name: 'Faculty of Technology' },
  { id: 2, name: 'Faculty of Engineering' },
  { id: 3, name: 'Faculty of Business' },
];

const specializations = [
  'Software Engineering',
  'Database Systems',
  'Artificial Intelligence',
  'Machine Learning',
  'Networking',
  'Cybersecurity',
  'Data Science',
  'Web Development',
  'Mobile App Development',
];

const subjects = [
  'Programming Fundamentals',
  'Database Management',
  'Web Development',
  'Computer Networks',
  'Software Engineering',
  'Algorithms',
  'Data Structures',
  'Operating Systems',
  'Artificial Intelligence',
  'Machine Learning',
  'Cybersecurity',
  'Mobile App Development',
];


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


const LecturerRegistrationForm = () => {


  const [openSnackbar, setOpenSnackbar] = useState(false);
  const handleCloseSnackbar = () => setOpenSnackbar(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);


  const [lecturerData, setLecturerData] = useState({
    lecturerId: `LEC-${uuidv4().slice(0, 8)}`,
    fullName: '',
    email: '',
    gender: '',
    dob: null,
    address: '',
    department: '',
    faculty: '',
    specialization: '',
    assignedSubjects: [],
    joinDate: new Date(),
    experience: '',
    profilePicture: null,
    username: '',
    role: 'lecturer',
    password: generatePassword()
  });

  const [profilePreview, setProfilePreview] = useState(null);
  const [subjectInput, setSubjectInput] = useState('');
  const [copyTooltip, setCopyTooltip] = useState('Copy to clipboard');


  const handleChange = (e) => {
    const { name, value } = e.target;
    setLecturerData({
      ...lecturerData,
      [name]: value
    });
  };

  const handleDateChange = (name, date) => {
    setLecturerData({
      ...lecturerData,
      [name]: date
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLecturerData({
        ...lecturerData,
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

  const handleSubjectChange = (e) => {
    setSubjectInput(e.target.value);
  };

  const addSubject = () => {
    if (subjectInput && !lecturerData.assignedSubjects.includes(subjectInput)) {
      setLecturerData({
        ...lecturerData,
        assignedSubjects: [...lecturerData.assignedSubjects, subjectInput]
      });
      setSubjectInput('');
    }
  };

  const copyPasswordToClipboard = () => {
    navigator.clipboard.writeText(lecturerData.password).then(() => {
      setCopyTooltip('Copied!');
      setTimeout(() => setCopyTooltip('Copy to clipboard'), 2000);
    });
  };

  const removeSubject = (subject) => {
    setLecturerData({
      ...lecturerData,
      assignedSubjects: lecturerData.assignedSubjects.filter(s => s !== subject)
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Here you would typically send the data to your backend
  //   console.log('Lecturer registration data:', lecturerData);
  //   alert('Lecturer registration submitted!');
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      // Check if user already exists
      const userExists = await checkUserExists(lecturerData.email, lecturerData.username);

      if (userExists.exists) {
        setError(`A user with this ${userExists.field} already exists`);
        setLoading(false);
        return;
      }

      // Call the service function to save student data
      const savedLecturer = await saveUser(lecturerData);

      const templateParams = {
        to_name: lecturerData.fullName,
        username: lecturerData.username,
        password: lecturerData.password,
        message: `Please change your password upon your first login for security purposes.`,
        email: lecturerData.email
      };

      await sendEmail(templateParams);

      setSuccess(true);
      setOpenSnackbar(true);
      console.log('Lecturer saved successfully:', savedLecturer);

      // Reset form
      setLecturerData({
        lecturerId: `LEC-${uuidv4().slice(0, 8)}`,
        fullName: '',
        email: '',
        gender: '',
        dob: null,
        address: '',
        department: '',
        faculty: '',
        specialization: '',
        assignedSubjects: [],
        joinDate: new Date(),
        experience: '',
        profilePicture: null,
        username: '',
        role: 'lecturer',
        password: generatePassword()
      });
    } catch (err) {
      setError('Failed to register lectuer. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Lecturer Registration
        </Typography>

        {error && <Alert severity="error" sx={{ mt: 2, mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Lecturer ID */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Lecturer ID"
                name="lecturerId"
                value={lecturerData.lecturerId}
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
                value={lecturerData.fullName}
                onChange={handleChange}
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
                value={lecturerData.email}
                onChange={handleChange}
              />
            </Grid>

            {/* Gender */}
            <Grid item xs={12} md={6}>
              <FormControl component="fieldset" required>
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  row
                  name="gender"
                  value={lecturerData.gender}
                  onChange={handleChange}
                >
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
              </FormControl>
            </Grid>

            {/* Date of Birth */}
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date of Birth"
                  value={lecturerData.dob}
                  onChange={(date) => handleDateChange('dob', date)}
                  renderInput={(params) => <TextField {...params} fullWidth required />}
                />
              </LocalizationProvider>
            </Grid>

            {/* Join Date */}
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Join Date"
                  value={lecturerData.joinDate}
                  onChange={(date) => handleDateChange('joinDate', date)}
                  renderInput={(params) => <TextField {...params} fullWidth required />}
                />
              </LocalizationProvider>
            </Grid>

            {/* Address */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Address"
                name="address"
                multiline
                rows={2}
                value={lecturerData.address}
                onChange={handleChange}
              />
            </Grid>

            {/* Department */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Department</InputLabel>
                <Select
                  name="department"
                  value={lecturerData.department}
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
                  value={lecturerData.faculty}
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

            {/* Specialization */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Specialization</InputLabel>
                <Select
                  name="specialization"
                  value={lecturerData.specialization}
                  onChange={handleChange}
                  label="Specialization"
                >
                  {specializations.map((spec, index) => (
                    <MenuItem key={index} value={spec}>
                      {spec}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Experience */}
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                label="Years of Experience"
                name="experience"
                type="number"
                value={lecturerData.experience}
                onChange={handleChange}
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Grid>

            {/* Assigned Subjects */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Assigned Subjects
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={9}>
                  <FormControl fullWidth>
                    <InputLabel>Select Subject</InputLabel>
                    <Select
                      value={subjectInput}
                      onChange={handleSubjectChange}
                      label="Select Subject"
                    >
                      {subjects.map((subject, index) => (
                        <MenuItem key={index} value={subject}>
                          {subject}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <Button
                    variant="contained"
                    onClick={addSubject}
                    fullWidth
                    sx={{ height: '100%' }}
                  >
                    Add Subject
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {lecturerData.assignedSubjects.map((subject, index) => (
                      <Chip
                        key={index}
                        label={subject}
                        onDelete={() => removeSubject(subject)}
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Grid>
              </Grid>
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
                required
                fullWidth
                label="Login Username"
                name="username"
                value={lecturerData.username}
                onChange={handleChange}
              />
            </Grid>

            {/* Auto-generated Password */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="text" // Changed to text so the user can see the generated password
                value={lecturerData.password}
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
                Register Lecturer
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
          Lecturer registered successfully!
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

export default LecturerRegistrationForm;