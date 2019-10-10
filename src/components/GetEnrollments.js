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
import 'react-widgets/dist/css/react-widgets.css';
import $ from 'jquery';



var Table = Reactable.Table;

class GetEnrollments extends React.Component {
    constructor(props) {
    super(props);
     this.state = {results:[],dept:''}
     this.processResults = this.processResults.bind(this);
   }
   processResults(courses,temp) {
      this.setState({results:courses, dept:temp}, () => {
        console.log(this.state.dept);
      });
      var apiBaseUrl = "http://localhost:5000/ogms/insertEnrollInfo";  
          var payload = {
          "enroll":this.state.results,
          "dept":this.state.dept
          }
          console.log(this.state.results[0]);
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
        <h1 align="center">Enrollments List</h1>
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
        var gradurl = "http://localhost:5000/paws/enroll_info/"+this.state.department;   
         $.ajax({
          url: gradurl,
          dataType: 'json',
          cache: false,
          success: function(jsondata) {
            this.props.callbackParent(jsondata,this.state.department);
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
            data.push({ sid: temp[i][0],term: temp[i][1],year: temp[i][2],crn: temp[i][3],cno: temp[i][5],grade: temp[i][4]})
        }

    const columns = [
        {
            Header: 'Student ID',
            accessor: 'sid'
        },
        {
            Header: 'Term',
            accessor: 'term'
        },
        {
            Header: 'Year',
            accessor: 'year'
        },
        {
            Header: 'CRN',
            accessor: 'crn'
        },
        {
            Header: 'CNO',
            accessor: 'cno'
        },
        {
            Header: 'Grade',
            accessor: 'grade'
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



export default GetEnrollments;