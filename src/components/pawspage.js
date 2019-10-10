
import React from 'react';
import axios from 'axios';

import {Textfield,Button} from 'react-mdl';
import {  MdEmail,MdLock,MdFingerprint } from 'react-icons/md';
import Particles from "react-particles-js";



class PawsPage extends React.Component {
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
    var apiBaseUrl = "http://localhost:5000/paws";
    var self = this;
    var payload = {
      "email":this.state.email,
      "password":this.state.password
    }  
    console.log(payload);
       
      axios.post(apiBaseUrl+'/authenticate', payload).then(function (response) {
      console.log(response);
      if (response.status === 200) {
        
        if (response.data.Status==="Applicant") {
          self.props.history.push({
            pathname: '/PawsHome',
                      state: {email: self.state.email,
                              name: response.data.name,
                              sid: response.data.sid,
                              department:response.data.department
                             }
          });
        }
        else if (response.data.Status==="Admin") {
          self.props.history.push({
            pathname: '/pawsadmin',
            state: {email: self.state.email}
          });
        }
        else {
          alert("Invalid credentials");
          self.props.history.push({
            pathname: '/pawspage'
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
        <center>
        <h4>Faculty Login</h4>
        <form  onSubmit={this.handleSubmit}>
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
       
        </table>
        
       
        </form>
        </center>
      </div>
    )
  }
}




export default PawsPage;