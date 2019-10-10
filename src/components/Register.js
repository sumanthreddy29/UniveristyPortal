import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import {Textfield,Button} from 'react-mdl';
import { FaUserAlt } from 'react-icons/fa';
import {  MdEmail,MdLock } from 'react-icons/md';

class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:'',
      fname:'',
      lname:''
    }
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.handleChange4 = this.handleChange4.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange1(event) {
    this.setState({email: event.target.value});
  }

  handleChange2(event) {
    this.setState({password: event.target.value});
  }

  handleChange3(event) {
    this.setState({fname: event.target.value});
  }

  handleChange4(event) {
    this.setState({lname: event.target.value});
  }

  handleSubmit(event) {
    console.log("hello");
    var apiBaseUrl = "http://localhost:5000/slate";
    var self = this;
    var payload = {
      "email":this.state.email,
      "password":this.state.password,
      "fname": this.state.fname,
      "lname":this.state.lname
    }
    axios.post(apiBaseUrl+'/register', payload).then(function (response) {
      console.log(response);
      if (response.status === 200) {
        if (response.data.Status) {
          self.props.history.push({
            pathname: '/mainmenu',
            state: {email: self.state.email}
          });
        }
          else{
              
               alert("Registration failed");
          self.props.history.push({
            pathname: '/register'
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
        <center>
      <div>
        <h4>Slate Register</h4>
        <form onSubmit={this.handleSubmit}>
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
                pattern="^(?=.*).{5,}$"
                error="Password should be min of 5 characters"
                label="Password"
                type="password"
                style={{width: '200px'}}/></td>
          </tr>
          <tr>
          <td><FaUserAlt size='30' /></td>
          <td><Textfield
                onChange={this.handleChange3}
              error={this.state.error1}
                errorColor={'red'}
                onFocus={() => this.setState({error1: "First name can't be blank"})}
              pattern={this.state.fname.length>0}
                label="First Name"
                style={{width: '200px'}}/></td>
          </tr>
          <tr>
          <td><FaUserAlt size='30' /></td>
          <td><Textfield
                onChange={this.handleChange4}
                error={this.state.error2}
                errorColor={'red'}
                onFocus={() => this.setState({error2: "Last name can't be blank"})}
                pattern={this.state.lname.length>0}
                label="Last Name"
                style={{width: '200px'}}/></td>
          </tr>
          <tr>
          <td></td>
          <td><Button raised ripple type="submit" value="Submit">Submit</Button></td>
          </tr>
        </table>
        </form>
      </div>
        </center>
    )
  }
}

export default withRouter(Register);
