import React from 'react';
import { Switch, Route } from 'react-router-dom';


import Home from './Home';
import SlatePage from './slatepage';
import PawsPage from './pawspage';
import OgmsPage from './ogmspage';
import Register from './Register';
import MainMenu from './MainMenu';
import CreateApplication from './CreateApplication';
import UpdateProfile from './UpdateProfile';
import ApplicationStatus from './Applicationstatus';
import AcceptedStudents from './AcceptedStudents';
import SlateAdmin from './slateadmin';
import ApplicationDecisons from './ApplicationDecisions';
import AddDropCourses from './AddDropCourses';
import PawsHome from './PAWSHome';
import CourseSchedule from './CourseSchedule';
import ViewFees from './ViewFees';
import Statistics from './Statistics';
import DropCourses from './DropCourses';
import Pawsadmin from './Pawsadmin';
import GetCourses from './GetCourses';
import GetEnrollments from './GetEnrollments';
import GetStudents from './GetStudents';
import OGMSHome from './OGMSHome';
import Assitantship from './Assitantship';
import Grade from './Grade';
import Bg from './background';

import DeptStatistics from './DeptStatistics';
const Main = () => (
    <Switch>
        <Route exact path = "/" component = {Home} />
        <Route path = "/slatepage" component = {SlatePage} />
        <Route path = "/pawspage" component = {PawsPage} />
        <Route path = "/ogmspage" component = {OgmsPage} />
        <Route path = "/register" component = {Register} />
        <Route path = "/createapplication" component = {CreateApplication} />
      <Route path = "/applicationstatus" component = {ApplicationStatus} />
      <Route path = "/slateadmin" component = {SlateAdmin} />
      <Route path = "/bg" component = {Bg} />
    <Route path = "/applications" component = {ApplicationDecisons} />
    <Route path = "/courses" component = {AddDropCourses} />
    <Route path = "/PawsHome" component = {PawsHome} />
    <Route path = "/OgmsHome" component = {OGMSHome} />
    <Route path ="/CourseSchedule"    component={CourseSchedule}/>
    <Route path="/viewfees" component={ViewFees} />
        <Route path="/stats" component={Statistics} /> 
             <Route path="/mainmenu" component={MainMenu} />
        <Route path="/updateprofile" component={UpdateProfile} /> 
        <Route path = "/AcceptedStudents" component = {AcceptedStudents} />
     <Route path = "/pawsadmin" component = {Pawsadmin} />
    <Route path="/getcourses" component={GetCourses} /> 
        <Route path = "/getenrollments" component = {GetEnrollments} />
     <Route path = "/getstudents" component = {GetStudents} />
     <Route path = "/assitantships" component = {Assitantship} />
    <Route path = "/grade" component = {Grade} />
           <Route path="/deptstats" component={DeptStatistics}/>
        <Route path="/dropcourses" component={DropCourses} />
      </Switch>
   
)

export default Main;