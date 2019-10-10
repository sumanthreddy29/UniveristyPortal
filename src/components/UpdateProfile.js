import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import {Textfield,Button} from 'react-mdl';
import {FaPowerOff} from 'react-icons/fa';
import { Link } from 'react-router-dom'
class UpdateProfile extends Component {
  constructor(props){
    super(props);
    this.state={
      password:'',
      fname:'',
      lname:'',
      address1:'',
      address2:'',
      city:'',
      state:'',
      zip:'',
      GREQ:'',
      GREV:'',
      GREA:'',
      TOEFL:'',
        isEnabled:''
      //toLogin: false
    }
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.handleChange4 = this.handleChange4.bind(this);
    this.handleChange5 = this.handleChange5.bind(this);
    this.handleChange6 = this.handleChange6.bind(this);
    this.handleChange7 = this.handleChange7.bind(this);
    this.handleChange8 = this.handleChange8.bind(this);
    this.handleChange9 = this.handleChange9.bind(this);
    this.handleChange10 = this.handleChange10.bind(this);
    this.handleChange11 = this.handleChange11.bind(this);
    this.handleChange12 = this.handleChange12.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }

  handleChange1(event) {
    this.setState({email: event.target.value});
  }

  handleChange2(event) {
    this.setState({fname: event.target.value});
  }

  handleChange3(event) {
    this.setState({lname: event.target.value});
  }

  handleChange4(event) {
    this.setState({address1: event.target.value});
  }

  handleChange5(event) {
    this.setState({address2: event.target.value});
  }

  handleChange6(event) {
    this.setState({city: event.target.value});
  }

  handleChange7(event) {
    this.setState({state: event.target.value});
  }

  handleChange8(event) {
    this.setState({zip: event.target.value});
  }

  handleChange9(event) {
    this.setState({GREV: event.target.value});
  }

  handleChange10(event) {
    this.setState({GREQ: event.target.value});
  }

  handleChange11(event) {
    this.setState({GREA: event.target.value});
  }

  handleChange12(event) {
    this.setState({TOEFL: event.target.value});
  }
    handleChange13(event) {
    this.setState({password: event.target.value});
  }
 
 
  handleSubmit(event) {
    
    var apiBaseUrl = "http://localhost:5000/slate";
    var self = this;
    var payload = {
      "email":this.state.email,
      "password":this.state.password,
      "fname": this.state.fname,
      "lname":this.state.lname,
      "address1":this.state.address1,
      "address2":this.state.address2,
      "city":this.state.city,
      "state":this.state.state,
      "zip":this.state.zip,
      "GREQ":this.state.GREQ,
      "GREV":this.state.GREV,
      "GREA":this.state.GREA,
      "TOEFL":this.state.TOEFL
    }
   
    axios.post(apiBaseUrl+'/applicant/update/'+this.state.email, payload).then(function (response) {
      console.log(response);
      if (response.status === 200) {
        if(response.data.Status){
        self.props.history.push({
          pathname: '/mainmenu',
          state: {email: self.state.email}
        });
        }
        //self.props.history.push('/mainmenu');
      }
   })
   .catch(function (error) {
     console.log(error);
    });
    event.preventDefault();
  }

  componentDidMount() {
    var apiBaseUrl = "http://localhost:5000/slate";
    var self = this;
    var email = this.props.location.state.email;
    axios.get(apiBaseUrl+'/applicant/'+email)
    .then(function (response) {
  
   self.setState({ 
       password:response.data.Applicant[0][0].password,
      fname:response.data.Applicant[0][0].fname,
      lname:response.data.Applicant[0][0].lname,
      address1:response.data.Applicant[0][0].address1,
      address2:response.data.Applicant[0][0].address2,
      city:response.data.Applicant[0][0].city,
      state:response.data.Applicant[0][0].state,
      zip:response.data.Applicant[0][0].zip,
      GREQ:response.data.Applicant[0][0].greq,
      GREV:response.data.Applicant[0][0].grev,
      GREA:response.data.Applicant[0][0].grea,
     TOEFL:response.data.Applicant[0][0].toefl,
                  email:email
      })
 })     
    
    
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
        return (
      <div>
             <h6 align="right">  {this.props.location.state.email}  <Link to="/slatepage"><FaPowerOff size='40'/></Link>   </h6> 
        <center>
        <h4>Slate Update Profile</h4>
       
        <table>
          <tr>
          <td>First Name:</td>
            <td><Textfield
                type="First Name"
                value={this.state.fname}
                onChange={this.handleChange2}
                pattern="[A-Za-z]+$"
                error="First name cannot be blank"
                label="First Name"
                style={{width: '200px'}}/></td>
          
          <td>Last Name:</td>
            <td><Textfield
                type="Last Name"
                value={this.state.lname}
                onChange={this.handleChange3}
                pattern="[A-Za-z]+$"
                error="Last name cannot be blank"
                label="Last Name"
                style={{width: '200px'}}/></td>
            
          
          <td>Address1:</td>
            <td><Textfield
                type="Address1"
                value={this.state.address1}
                onChange={this.handleChange4}
                pattern="[A-Za-z \d]+$"
                error="Address1 cannot be blank"
                label="Address1"
                style={{width: '200px'}}/></td>
         
          <td>Address2:</td>
            <td><Textfield
                type="Address2"
                value={this.state.address2}
                onChange={this.handleChange5}
                pattern="[A-Za-z \d]+$"
                error="Address2 cannot be blank"
                label="Address2"
                style={{width: '200px'}}/></td>
            <td></td>
          </tr>
          <tr>
          <td>City:</td>
            <td><Textfield
                type="City"
                value={this.state.city}
                onChange={this.handleChange6}
                pattern="[A-Za-z]+$"
                error="City cannot be blank"
                label="City"
                style={{width: '200px'}}/></td>
          
          <td>State:</td>
            <td><Textfield
                type="State"
                value={this.state.state}
                onChange={this.handleChange7}
                pattern="[A-Za-z]+$"
                error="State cannot be blank"
                label="State"
                style={{width: '200px'}}/></td>
          
          <td>Zip:</td>
            <td><Textfield
                type="Zip"
                value={this.state.zip}
                onChange={this.handleChange8}
                pattern="[0-9]+$"
                error="Zip cannot be blank"
                label="Zip"
                style={{width: '200px'}}/></td>
            <td></td>
          </tr>
          <tr>
          <td>GREV:</td>
            <td><Textfield
                type="GREV"
                value={this.state.GREV}
                onChange={this.handleChange9}
                pattern="[0-9]+$"
                error="GREV cannot be blank"
                label="GREV"
                style={{width: '200px'}}/></td>
         
          <td>GREQ:</td>
            <td><Textfield
                type="GREQ"
                value={this.state.GREQ}
                onChange={this.handleChange10}
                pattern="[0-9]+$"
                error="GREV cannot be blank"
                label="GREQ"
                style={{width: '200px'}}/></td>
         
            
          <td>GREA:</td>
            <td><Textfield
                type="GREA"
                value={this.state.GREA}
                onChange={this.handleChange11}
                pattern="[0-9]+$"
                error="GREA cannot be blank"
                label="GREA"
                style={{width: '200px'}}/></td>
          
          <td>TOEFL:</td>
            <td><Textfield
                type="TOEFL"
                value={this.state.TOEFL}
                onChange={this.handleChange12}
                pattern="[0-9]+$"
                error="TOEFL cannot be blank"
                label="TOEFL"
                style={{width: '200px'}}/></td>
            <td></td>
          </tr>
              </table>
         
          <center><Button raised ripple onClick={this.handleSubmit} type ="submit">Save</Button></center>
          
      
       
        </center>
      </div>
    )
  }
}

export default withRouter(UpdateProfile)
