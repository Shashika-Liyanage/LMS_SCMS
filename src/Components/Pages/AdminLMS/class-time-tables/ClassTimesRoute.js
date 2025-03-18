import Dashboard from './Dashboard';
import ClassroomSchedule from './ClassRoomShedule';
// import ClassroomList from './ClassroomList';
// import TimeSlotForm from './TimeSlotForm';
import { ScheduleProvider } from './SheduleContext';
import { useNavigate ,Router,Routes,Route} from "react-router-dom";
import NewSchedule from './views/NewShedule';
import FullSchedule from './views/ViewFullShadule';
import AddNewClass from './views/NewClass';

function TimeSheduleRoute() {
    return (
        <ScheduleProvider>
                <Routes>
                    <Route index path="/" element={<Dashboard />} />
                    {/* <Route path="/classrooms" element={<ClassroomList />} /> */}
                    <Route path="/schedule" element={<ClassroomSchedule />} />
                    <Route path="/schedule/new-class" element={<NewSchedule />} />
                    <Route path="/schedule/view-all" element={<FullSchedule />} />
                    <Route path="/class/new" element={<AddNewClass />} />
                    {/*<Route path="/schedule/edit/:id" element={<TimeSlotForm />} /> */}
                </Routes>
        </ScheduleProvider>
    );
}

export default TimeSheduleRoute;