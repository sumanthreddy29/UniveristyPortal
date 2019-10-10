import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import {FaPowerOff} from 'react-icons/fa'
class Success extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

  }
    
  render() {
    return (
      
        <div className="hoverText">
             <h6 align="right">  {this.props.location.state.name}  <Link to="/pawspage"><span title="Logout"><FaPowerOff size='30'/></span></Link>   </h6> 
        <center>
            <h3>PAWS</h3>
       
    
            <table>
             <tr>
                <td><Link to={{pathname:'/courses',state:{name: this.props.location.state.name, sid: this.props.location.state.sid,department:this.props.location.state.department}}}> Add Courses</Link></td>
             </tr>
        <tr>
                <td><Link to={{pathname:'/dropcourses',state:{name: this.props.location.state.name, sid: this.props.location.state.sid,department:this.props.location.state.department}}}> Drop Courses</Link></td>
             </tr>
             
             <tr>
                <td><Link to={{pathname:'/CourseSchedule',state:{name: this.props.location.state.name, sid: this.props.location.state.sid}}}> View Course Schedule</Link></td>
             </tr>
             <tr>
                <td><Link to={{pathname:'/viewfees',state:{name: this.props.location.state.name, sid: this.props.location.state.sid}}}> ViewFees</Link></td>
             </tr>
            </table>
        </center>
      </div>
        
    )
  }
}

export default withRouter(Success)
