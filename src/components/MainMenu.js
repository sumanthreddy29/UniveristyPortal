import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom';
import {FaPowerOff,FaUserEdit} from 'react-icons/fa';


class MainMenu extends React.Component {
  render() {
    return (
      <div align='center' width='400px'>
        <h6>Welcome to Georgia State University</h6>
<h5 align='center'>Hi  {this.props.location.state.email}</h5><h5 align='center'> <Link to= {{pathname:'/updateprofile',state: {email: this.props.location.state.email}} }> <FaUserEdit size='40px' /></Link> <Link to="/slatepage"><FaPowerOff size='40px' /></Link>   </h5>      
       <h6> </h6>
        <h6> <Link to=
          {{pathname:'/createApplication', state: {email: this.props.location.state.email}}
          }> CreateApplication</Link></h6>
         <h6> Already applied. Track your application here<Link to=
          {{pathname:'/applicationstatus', state: {email: this.props.location.state.email}}
          }> ApplicationStatus</Link></h6>
        
      </div>
    )
  }
}

export default withRouter(MainMenu)
