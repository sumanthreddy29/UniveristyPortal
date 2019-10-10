

import React from 'react'
import axios from 'axios';
import {Textfield,Button} from 'react-mdl';
import {  MdEmail,MdLock,MdFingerprint } from 'react-icons/md';


class OgmsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: ''};

    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange1(event) {
    this.setState({email: event.target.value});
  }

  handleChange2(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
   
    var self = this;
    var payload = {
      "email":this.state.email,
      "password":this.state.password
    }  
    console.log(payload);
       
     if(self.state.email=="admin@gmail.com" && self.state.password=="admin")
         { 
             self.props.history.push({
            pathname: '/ogmsHome',
            state: {email: self.state.email}
          });
         }
     
        else {
          alert("Invalid credentials");
          self.props.history.push({
            pathname: '/ogmspage'
          });
        }
    
    event.preventDefault();
  }

  render() {
    return (
      <div>
        
        <center>
        <h4>OGMS Login</h4>
        <form className="bg-color" onSubmit={this.handleSubmit}>
        <table>
          <tr>
          <td><MdEmail  size='30'/></td>
          <td><Textfield
                onChange={this.handleChange1}
                pattern="^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$"
                error="Input is not in email format!"
                label="Email"
                style={{width: '200px'}}/></td>
          </tr>
          <tr>
          <td><MdLock  size='35'/></td>
          <td><Textfield
                 onChange={this.handleChange2} 
                 type="password"
                pattern="^(?=.*).{5,}$"
                error="Psssword not following req"
                label="Password"
                style={{width: '200px'}}/></td>
          </tr>
          <tr><td/>
     <td ><Button><MdFingerprint size='40' /></Button></td>
          </tr>
       
        </table>
        
       
        </form>
        </center>
      </div>
    )
  }
}





export default OgmsPage;