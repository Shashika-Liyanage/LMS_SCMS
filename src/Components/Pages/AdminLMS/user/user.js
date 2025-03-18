import React, { useState, useEffect } from 'react';
import {
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Paper,
  Menu,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
  Card,
  CardContent,
  Grid,
  Box,
  Divider,
  IconButton
} from '@mui/material';
import { CircularProgress, Alert, Snackbar, Backdrop } from '@mui/material';
import {
  Search as SearchIcon,
  Add as PlusIcon,
  FilterList as FilterIcon,
  Person as UserIcon,
  Group as TeamIcon,
  MoreVert as EllipsisIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { getAllUsers, deleteUser } from '../../../../service/firebase/user.service';

// Dummy data
const dummyUsers = [
  {
    key: '1',
    id: 'USR001',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Student',
    department: 'Computer Science',
    status: 'Active',
    joinDate: '2023-05-12'
  },
  {
    key: '2',
    id: 'USR002',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Student',
    department: 'Physics',
    status: 'Active',
    joinDate: '2023-06-18'
  },
  {
    key: '3',
    id: 'USR003',
    name: 'Dr. Robert Johnson',
    email: 'robert.johnson@example.com',
    role: 'Lecturer',
    department: 'Mathematics',
    status: 'Active',
    joinDate: '2022-11-05'
  },
  {
    key: '4',
    id: 'USR004',
    name: 'Emily Parker',
    email: 'emily.parker@example.com',
    role: 'Student',
    department: 'Biology',
    status: 'Inactive',
    joinDate: '2023-08-22'
  },
  {
    key: '5',
    id: 'USR005',
    name: 'Prof. Michael Brown',
    email: 'michael.brown@example.com',
    role: 'Lecturer',
    department: 'Computer Science',
    status: 'Active',
    joinDate: '2021-09-15'
  }
];

const User = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState('asc');
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [userData, setUserData] = useState([]);


  const [loading, setLoading] = useState(false);


  // Dropdown menus
  const [addUserAnchorEl, setAddUserAnchorEl] = useState(null);
  const [actionAnchorEl, setActionAnchorEl] = useState({});


  // Add these new state variables
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {

    fetchUsers()

  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const options = {};

      const fetchedUsers = await getAllUsers(options);

      const formattedUsers = fetchedUsers.map((user, index) => {
        return {
          key: (index + 1).toString(),
          id: user.studentId || user.id,
          name: user.fullName,
          email: user.email,
          role: user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : '',
          department: user.department,
          status: 'Active',
          joinDate: user.enrollDate ? new Date(user.enrollDate.seconds * 1000).toISOString().split('T')[0] :
            user.createdAt ? new Date(user.createdAt.seconds * 1000).toISOString().split('T')[0] : ''
        };
      });
      setUserData(formattedUsers);
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete user
  const handleDeleteClick = async (userId) => {
    setLoading(true)
    try {
      await deleteUser(userId);
      setOpenDeleteDialog(false);
      setSnackbarMessage('User deleted successfully');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      // Refresh user list
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      setSnackbarMessage('Failed to delete user');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      setLoading(false)
    } finally{
       setLoading(false)
    }
  };

  // Filter data based on search text and filters
  const filteredData = userData.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase()) ||
      user.department.toLowerCase().includes(searchText.toLowerCase());

    const matchesRole = filterRole === 'all' || user.role.toLowerCase() === filterRole.toLowerCase();

    const matchesDepartment = selectedDepartments.length === 0 ||
      selectedDepartments.includes(user.department);

    const matchesRoleFilter = selectedRoles.length === 0 ||
      selectedRoles.includes(user.role);

    return matchesSearch && matchesRole && matchesDepartment && matchesRoleFilter;
  });

  // Sorting function
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(a, b, orderBy) {
    if (orderBy === 'joinDate') {
      return new Date(b[orderBy]).getTime() - new Date(a[orderBy]).getTime();
    }
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Menu handlers
  const handleAddUserClick = (event) => {
    setAddUserAnchorEl(event.currentTarget);
  };

  const handleAddUserClose = () => {
    setAddUserAnchorEl(null);
  };

  const handleAddUser = (type) => {
    navigate(`/admin/register/${type.toLowerCase()}`);
    handleAddUserClose();
  };

  const handleActionClick = (event, id) => {
    setActionAnchorEl({ ...actionAnchorEl, [id]: event.currentTarget });
  };

  const handleActionClose = (id) => {
    setActionAnchorEl({ ...actionAnchorEl, [id]: null });
  };

  // Departments for filter
  const departments = [...new Set(userData.map(user => user.department))];

  return (
    <Card className="user-dashboard" variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h5" color="textSecondary">
            Users Dashboard
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              placeholder="Search by name, email, or department"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1 }} />,
              }}
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={3} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel id="role-filter-label">Filter by Role</InputLabel>
              <Select
                labelId="role-filter-label"
                value={filterRole}
                label="Filter by Role"
                onChange={(e) => setFilterRole(e.target.value)}
              >
                <MenuItem value="all">All Roles</MenuItem>
                <MenuItem value="student">Students</MenuItem>
                <MenuItem value="lecturer">Lecturers</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3} md={6}>
            <Box display="flex" justifyContent="flex-end" width="100%">
              <Button
                variant="contained"
                color="primary"
                startIcon={<PlusIcon />}
                onClick={handleAddUserClick}
              >
                Add User
              </Button>
              <Menu
                anchorEl={addUserAnchorEl}
                open={Boolean(addUserAnchorEl)}
                onClose={handleAddUserClose}
              >
                <MenuItem onClick={() => handleAddUser('Student')}>
                  <UserIcon fontSize="small" sx={{ mr: 1 }} />
                  Student
                </MenuItem>
                <MenuItem onClick={() => handleAddUser('Lecturer')}>
                  <TeamIcon fontSize="small" sx={{ mr: 1 }} />
                  Lecturer
                </MenuItem>
              </Menu>
            </Box>
          </Grid>
        </Grid>

        <TableContainer component={Paper} variant="outlined">
          <Table sx={{ minWidth: 650 }} aria-label="user table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'id'}
                    direction={orderBy === 'id' ? order : 'asc'}
                    onClick={() => handleRequestSort('id')}
                  >
                    ID
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'name'}
                    direction={orderBy === 'name' ? order : 'asc'}
                    onClick={() => handleRequestSort('name')}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>Email</TableCell>
                {/* <TableCell>Role</TableCell> */}
                <TableCell>Department</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'joinDate'}
                    direction={orderBy === 'joinDate' ? order : 'asc'}
                    onClick={() => handleRequestSort('joinDate')}
                  >
                    Join Date
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{filteredData &&
              stableSort(filteredData, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>
                      <Typography
                        component="a"
                        variant="body2"
                        sx={{
                          cursor: 'pointer',
                          color: 'primary.main',
                          textDecoration: 'none',
                          '&:hover': { textDecoration: 'underline' }
                        }}
                        onClick={() => navigate(`/users/${user.id}`)}
                      >
                        {user.name}
                      </Typography>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    {/* <TableCell>
        <Chip
          label={user.role}
          color={user.role === 'Student' ? 'primary' : 'success'}
          size="small"
        />
      </TableCell> */}
                    <TableCell>{user.department}</TableCell>
                    <TableCell>
                      <Chip
                        label={user.status}
                        color={user.status === 'Active' ? 'success' : 'error'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={(e) => handleActionClick(e, user.id)}
                      >
                        <EllipsisIcon />
                      </IconButton>
                      <Menu
                        anchorEl={actionAnchorEl[user.id]}
                        open={Boolean(actionAnchorEl[user.id])}
                        onClose={() => handleActionClose(user.id)}
                      >
                        <MenuItem onClick={() => {
                          navigate(`/users/${user.id}`);
                          handleActionClose(user.id);
                        }}>
                          View Details
                        </MenuItem>
                        <MenuItem onClick={() => {
                          navigate(`/users/edit/${user.id}`);
                          handleActionClose(user.id);
                        }}>
                          Edit
                        </MenuItem>
                        <MenuItem
                          sx={{ color: user.status === 'Active' ? 'error.main' : 'inherit' }}
                          onClick={() => handleActionClose(user.id)}
                        >
                          {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                        </MenuItem>
                        <MenuItem
                          sx={{ color: 'error.main' }}
                          onClick={() => {
                            handleActionClose(user.id)
                            handleDeleteClick(user.id);
                          }}
                        >
                          Delete
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))
            }
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </CardContent>

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
    </Card>
  );
};

export default User;