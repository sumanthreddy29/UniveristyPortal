import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom';
import {FaPowerOff} from 'react-icons/fa';

class SlateAdmin extends React.Component {
  render() {
    return (
      <div align='center'>
               
        <h6 align="right">  {this.props.location.state.email}  <Link to="/slatepage"><FaPowerOff size='40'/></Link>   </h6>       
       <h3> <Link to=
          {{pathname:"/applications", 
            state: {email: this.props.location.state.email}}
          }>Applications</Link></h3>
        
      </div>
    )
  }
}

export default withRouter(SlateAdmin)
