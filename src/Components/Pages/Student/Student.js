import React from 'react'
import StudentSidebar from './StudentSidebar/StudentSidebar'
import Navbar from '../../../Components/NavBar/Navbar'
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from "@mui/material";

function Student() {
  return (
    <>
    <StudentSidebar/>
    <Navbar/>

    <Box sx={{ padding: 3 }}>
      {/* Greeting Section */}
      <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        Good Afternoon
      </Typography>
      <Typography variant="h5" sx={{ marginBottom: 4 }}>
        A.d.u.m.u Kumari
      </Typography>

      {/* My Courses Section */}
      <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        My Courses
      </Typography>

      {/* Calendar View */}
      <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan={7} sx={{ fontWeight: "bold", textAlign: "center" }}>
                March 2025
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Sun</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Mon</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Tue</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Wed</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Thu</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Fri</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Sat</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Week 1 */}
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>1</TableCell>
            </TableRow>

            {/* Week 2 */}
            <TableRow>
              <TableCell>2</TableCell>
              <TableCell>3</TableCell>
              <TableCell>4</TableCell>
              <TableCell>5</TableCell>
              <TableCell>6</TableCell>
              <TableCell>7</TableCell>
              <TableCell>8</TableCell>
            </TableRow>

            {/* Week 3 */}
            <TableRow>
              <TableCell>9</TableCell>
              <TableCell>10</TableCell>
              <TableCell>11</TableCell>
              <TableCell>12</TableCell>
              <TableCell>13</TableCell>
              <TableCell>14</TableCell>
              <TableCell>15</TableCell>
            </TableRow>

            {/* Week 4 */}
            <TableRow>
              <TableCell>16</TableCell>
              <TableCell>17</TableCell>
              <TableCell>18</TableCell>
              <TableCell>19</TableCell>
              <TableCell>20</TableCell>
              <TableCell>21</TableCell>
              <TableCell>22</TableCell>
            </TableRow>

            {/* Week 5 */}
            <TableRow>
              <TableCell>23</TableCell>
              <TableCell>24</TableCell>
              <TableCell>25</TableCell>
              <TableCell>26</TableCell>
              <TableCell>27</TableCell>
              <TableCell>28</TableCell>
              <TableCell>29</TableCell>
            </TableRow>

            {/* Week 6 */}
            <TableRow>
              <TableCell>30</TableCell>
              <TableCell>31</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Course Details */}
      <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        Course Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              KU BSc in Software Engineering (2023 Update) - JAN Intake
            </Typography>
            <Typography variant="body2" sx={{ marginTop: 1 }}>
              Course duration details will be provided soon. Stay tuned for updates!
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              GE230 - Advanced Dill...
            </Typography>
            <Typography variant="body2" sx={{ marginTop: 1 }}>
              Scheduled on Tue, 25 March 2025.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
    
    </>
  )
}

export default Student