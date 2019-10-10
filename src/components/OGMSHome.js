import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import {FaPowerOff} from 'react-icons/fa';
class OGMSHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

  }
  render() {
    return (
      <div className="candy"><h6 align="right">   <Link to="/ogmspage"><FaPowerOff size='40'/></Link>   </h6>
        <center>
            <h3>OGMS Portal</h3>
        
            <table>
             <tr>
                <td><Link to={{pathname:'/getstudents'}}> Retrieve Students</Link></td>
             </tr>
             <tr>
                <td><Link to={{pathname:'/getcourses'}}> Retrieve Courses</Link></td>
             </tr>
             <tr>
                <td><Link to={{pathname:'/getenrollments'}}> Retrieve Enrollments</Link></td>
             </tr>
             <tr>
                <td><Link to={{pathname:'/assitantships'}}> Award Assistantship</Link></td>
             </tr>
             <tr>
                <td><Link to={{pathname:'/deptstats'}}> Department Level Statistics</Link></td>
             </tr>
             <tr>
                <td><Link to={{pathname:'/grade'}}> Submit Grade</Link></td>
             </tr>
            </table>
        </center>
      </div>
    )
  }
}

export default withRouter(OGMSHome)
