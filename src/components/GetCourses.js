import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom';
import {Textfield,Button} from 'react-mdl';
import axios from 'axios';
import {  MdDone,MdClear } from 'react-icons/md';
import {FaPowerOff,FaArrowLeft} from 'react-icons/fa';
import Reactable from "react-table";
import "react-table/react-table.css";
import 'react-widgets/dist/css/react-widgets.css';
import Select from 'react-select';
import DropdownList from 'react-widgets/lib/DropdownList';
import $ from 'jquery';


var Table = Reactable.Table;
 
class GetCourses extends React.Component {
    constructor(props) {
    super(props);
    this.state = {results:[]}
    this.processResults = this.processResults.bind(this);
   }
    processResults(courses) {
      this.setState({results:courses}, () => {
        console.log(this.state.results);
      });
      var apiBaseUrl = "http://localhost:5000/ogms/insertCourses";  
          var payload = {
          "courses":this.state.results
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
        <h1 align="center">Courses List</h1>
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
        var gradurl = "http://localhost:5000/paws/dc/"+this.state.department;   
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
        console.log(temp)  
        for(let i=0;i<temp.length;i++)
        {
            data.push({ dept: temp[i][0],cname: temp[i][2],cno: temp[i][1],credits: temp[i][3]})
        }

    const columns = [
        {
            Header: 'Department',
            accessor: 'dept'
        },
        {
            Header: 'Course Name',
            accessor: 'cname'
        },
        {
            Header: 'CNO',
            accessor: 'cno'
        },
        {
            Header: 'Credits',
            accessor: 'credits'
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

export default GetCourses;