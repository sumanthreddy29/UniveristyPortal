import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom';
import {Textfield,Button} from 'react-mdl';
import axios from 'axios';
import {  MdDone,MdClear } from 'react-icons/md';
import {FaPowerOff,FaArrowLeft} from 'react-icons/fa';
import Reactable from "react-table";
import "react-table/react-table.css";
import Select from 'react-select';
import DropdownList from 'react-widgets/lib/DropdownList';
import $ from 'jquery';


var Table = Reactable.Table;

class GetStudents extends React.Component {
    constructor(props) {
    super(props);
    this.state = {results:[]}
    this.processResults = this.processResults.bind(this);
   }
   processResults(courses) {
      this.setState({results:courses}, () => {
        console.log(this.state.results);
      });
      var apiBaseUrl = "http://localhost:5000/ogms/insertStudents";  
          var payload = {
           "studentsList":this.state.results
          }
          axios.post(apiBaseUrl,payload).then(function (response) {

          })     
          .catch(function (error) {
                console.log(error);
          });
   }
   render() {
    return (
      <div>
       <table>
        <tr ><td>
        <h6 align="left"> <Link to = {{pathname:'/ogmshome'}}><FaArrowLeft size='40'/></Link></h6> </td>
        <td width="1500px"><h6 align="right">   <Link to="/ogmspage"><FaPowerOff size='40'/></Link>   </h6></td></tr> </table>
        <h1 align="center">Students List</h1>
        <GSRequest callbackParent={this.processResults}/> <br/>
        <GSResult results={this.state.results} />
      </div>
    );
   }
}

class GSRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      department: ""
    }
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(fld,val) {
    var x = {};
    if (fld == "department")
      x["department"] = val;
    this.setState(x, () => {
      if ((this.state.department != "")) {
        var gradurl = "http://localhost:5000/paws/ls/"+this.state.department;   
         $.ajax({
          url: gradurl,
          dataType: 'json',
          cache: false,
          success: function(jsondata) {
            this.props.callbackParent(jsondata);
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
          
      }
    });
    }
    
  render() {
      
    return (
        <center>
      <table>
        <tbody>
        <tr>
          <td><div style={{width: 200 + 'px'}} >
                <DepartmentPicker 
                   url="http://localhost:5000/slate/departments/GSU" 
                   callbackParent={this.onInputChange}
                   pollInterval={200000} />
              </div>
          </td>
        </tr>
        </tbody>
      </table>
        </center>
       
    );
  }
}
   
class GSResult extends React.Component {

  render() {
        var temp=[]
        temp=this.props.results
        const data=[]    
        for(let i=0;i<temp.length;i++)
        {
            data.push({ fname: temp[i][3],lname: temp[i][4],email: temp[i][1],degree: temp[i][10],
                dept: temp[i][11]})
        }

    const columns = [
        {
            Header: 'First Name',
            accessor: 'fname'
        },
        {
            Header: 'Last Name',
            accessor: 'lname'
        },
        {
            Header: 'Email',
            accessor: 'email'
        },
        {
            Header: 'Degree',
            accessor: 'degree'
        },
        {
            Header: 'Department',
            accessor: 'dept'
        }
    ]                                                                        
    return (
      (this.props.dept == "")?<div></div>: <Reactable  data={data} columns={columns}  defaultPageSize = {5} /> 
     );

    }
}




  
  
class DepartmentPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      departments: []
    }
  }

  componentDidMount() {

      fetch(this.props.url)
      .then(res => res.json())
      .then(
        (jsondata) => {
          this.setState({departments: jsondata});
       },
        (error) => {
          console.error(this.props.url, error.toString());
        }
          
      )
  }

  render() {
    return (
      <DropdownList
        data={this.state.departments}
        onChange={value => this.props.callbackParent("department",value) }
        placeholder="Department"/> 
    );
  }
}

  
export default GetStudents;