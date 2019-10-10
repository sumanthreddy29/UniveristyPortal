import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import axios from 'axios';
import {Textfield,Button} from 'react-mdl';
import { FaUserPlus } from 'react-icons/fa';
import {  MdEmail,MdLock,MdFingerprint } from 'react-icons/md';
import Particles from "react-particles-js";
import '../index.css';


class Login extends React.Component {
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
    var apiBaseUrl = "http://localhost:5000/slate";
    var self = this;
    var payload = {
      "email":this.state.email,
      "password":this.state.password
    }  
    console.log(payload);
       
      axios.post(apiBaseUrl+'/authenticate', payload).then(function (response) {
      console.log(response);
      if (response.status === 200) {
          console.log(response.data.Status);
        if (response.data.Status==="Applicant") {
          self.props.history.push({
            pathname: '/mainmenu',
            state: {email: self.state.email}
          });
        }
        else if (response.data.Status==="Admin") {
            console.log(response.data.Status==="Admin");
          self.props.history.push({
            pathname: '/slateadmin',
            state: {email: self.state.email}
          });
        }
        else {
          alert("Invalid credentials");
          self.props.history.push({
            pathname: '/slatepage'
          });
        }
      }
    })
            
    .catch(function (error) {
      console.log(error);
    });
    event.preventDefault();
  }

  render() {
    return (
      <div className="bg-color">
        <center>
         <Particles  className="part"
                params={{
                    "particles": {
                        "line_linked": {
                                    "color":"#FFFFFF"
                                    },
                        "number": {
                            "value": 150
                        },
                        "size": {
                            "value": 5
                        }
                    },
                    "interactivity": {
                        "events": {
                            "onhover": {
                                "enable": true,
                                "mode": "repulse"
                            }
                        }
                    }
                }}

                />
        <h4>Student Login</h4>
        <form onSubmit={this.handleSubmit}>
        <table>
          <tr>
          <td><MdEmail  size='30'/></td>
          <td><Textfield
                onChange={this.handleChange1}
                label="Email"
        error={this.state.error1}
                errorColor={'red'}
                onFocus={() => this.setState({error1: "Email can't be blank"})}
              pattern={this.state.email.length>0}
                style={{width: '200px'}}/></td>
          </tr>
          <tr>
          <td><MdLock  size='35'/></td>
          <td><Textfield
                 onChange={this.handleChange2}
                 label="Password"
                type="password"
            error={this.state.error2}
                errorColor={'red'}
                onFocus={() => this.setState({error2: "Password can't be blank"})}
              pattern={this.state.password.length>0}
                style={{width: '200px'}}/></td>
          </tr>
          <tr><td/>
     <td ><Button value="submit"><MdFingerprint size='40' /></Button></td>
          </tr>
        <tr><br/></tr>
        <tr><td/><td> <p>New User? <Link to="/register"><FaUserPlus size='35'/></Link></p></td></tr>
        </table>
        </form>



        </center>
      </div>
    )
  }
}

export default withRouter(Login)
