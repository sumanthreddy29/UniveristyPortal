import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom';
import {FaPowerOff} from 'react-icons/fa';

class Pawsadmin extends React.Component {
  render() {
    return (
      <div align='center'>
               
        <h6 align="right">  {this.props.location.state.email}  <Link to="/pawspage"><FaPowerOff size='40'/></Link>   </h6>       
       <h3> <Link to=
          {{pathname:"/AcceptedStudents" ,
            state: {email: this.props.location.state.email}}
          }> RequestApplications</Link></h3>
         <h3> <Link to=
          {{pathname:"/stats" ,
            state: {email: this.props.location.state.email}}
          }> Statistics</Link></h3>
        
      </div>
    )
  }
}

export default withRouter(Pawsadmin)
