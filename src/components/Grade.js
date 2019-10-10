
import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom';
import {Button} from 'react-mdl';
import axios from 'axios';
import {  MdDone,MdClear } from 'react-icons/md';
import {FaPowerOff,FaArrowLeft} from 'react-icons/fa';
import Select from 'react-select';
import Reactable from "react-table";
import "react-table/react-table.css";
import 'react-widgets/dist/css/react-widgets.css';
import DropdownList from 'react-widgets/lib/DropdownList';
import $ from 'jquery';

var Table = Reactable.Table;
var degrees = ['MS', 'PhD'];

class Grade extends React.Component { 
  constructor(props) {
      super(props);
      this.state = {
         results: [],
         degree: ""
      }
      this.processResults = this.processResults.bind(this);
   }

  processResults(deg,students) {
    this.setState({results:students, degree:deg}, () => {
      console.log(deg);
      console.log(this.state.results);
    });
  }

  render() {
    return (
      <div>
       <table>
        <tr ><td>
        <h6 align="left"> <Link to = {{pathname:'/ogmshome'}}><FaArrowLeft size='40'/></Link></h6> </td>
        <td width="1500px"><h6 align="right">   <Link to="/ogmspage"><FaPowerOff size='40'/></Link>   </h6></td></tr> </table>
        
        <h1 align="center">Award Grade for students </h1>
        <GSRequest callbackParent={this.processResults}/>
       <GSResult degree={this.state.degree} results={this.state.results} />
      </div>
    );
  }
}

class GSRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      department: "",
      degree: "",
      year: ""
    }
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(fld,val) {
    var x = {};
    if (fld == "department")
      x["department"] = val;
    else if (fld == "degree")
      x["degree"] = val;
    else
      x["year"] = val;
    this.setState(x, () => {
      if ((this.state.department != "") && (this.state.degree != "") && (this.state.year != "")) {
        var gradurl = "http://localhost:5000/ogms/getGradeDept/"+this.state.department+"/"+this.state.degree;
        if (this.state.year !="")
          gradurl = gradurl+"/"+this.state.year; 
         
         $.ajax({
          url: gradurl,
          dataType: 'json',
          cache: false,
          success: function(jsondata) {
            this.props.callbackParent(this.state.degree,jsondata);
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
          <td><div style={{width: 200 + 'px'}} >
                <DegreePicker 
                   callbackParent={this.onInputChange} />
              </div>
          </td>
          <td><div style={{width: 200 + 'px'}} >
                <YearPicker 
                  url="http://localhost:5000/slate/years" 
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
    
    
    
     handleSubmit(values,val) {
       val.preventDefault();
    var apiBaseUrl = "http://localhost:5000/ogms/updategrade";
    var self = this;
      var payload={
          "sid":values.sid,
          "term":values.term,
          "year":values.year,
          "crn":values.crn,
          "cno":values.cno,
          "grade":values.grade
      }
   console.log(values)
    axios.put(apiBaseUrl,payload).then(function (response) {
      console.log(response);
      if (response.status === 200) {
         var apiBaseUrl="http://localhost:5000/paws/ug";
          var payload={
          "sid":values.sid,
          "term":values.term,
          "year":values.year,
          "crn":values.crn,
          "cno":values.cno,
          "grade":values.grade
      }
          axios.put(apiBaseUrl,payload).then(function (response) {
      console.log(response);
      if (response.status === 200) {
         
      }
   })
   .catch(function (error) {
     console.log(error);
    });
      }
   })
   .catch(function (error) {
     console.log(error);
    });
   
  }
    
  render() {
        var temp=[]
    temp=this.props.results
        const data=[]    
  
    for(let i=0;i<temp.length;i++)
        {
  
       data.push({
           sid:temp[i][0],          
           grade: temp[i][4],
      term: temp[i][1],
           year:temp[i][2],
           crn:temp[i][3],
           cno:temp[i][5]
        
     })
  }
    const cols = [
        
        {
            Header: 'SID',
            accessor: 'sid',width:150
                },
       
               {
            Header: 'Term',
            accessor: 'term',width:150
        },
         {
            Header: 'Year',
            accessor: 'year',width:150
        },{
            Header: 'CRN',
            accessor: 'crn',width:150
          
        },
        {
            Header: 'Grade',
            accessor: 'grade',width:150
          
        },{
            Header: 'CNO',
            accessor: 'cno',width:150
          
        },{
            Header: 'Submit Grade',
            accessor: 'finalgrade',
              Cell: row => (<div>
         <Button  onClick={value=>this.handleSubmit({grade:"A",sid:row.original.sid,term:row.original.term,year:row.original.year,crn:row.original.crn,cno:row.original.cno},value)} value="A"><span class="red">A</span></Button>
        <Button  onClick={value=>this.handleSubmit({grade:"B",sid:row.original.sid,term:row.original.term,year:row.original.year,crn:row.original.crn,cno:row.original.cno},value)} value="B"><span class="red">B</span></Button>
        <Button  onClick={value=>this.handleSubmit({grade:"C",sid:row.original.sid,term:row.original.term,year:row.original.year,crn:row.original.crn,cno:row.original.cno},value)} value="C"><span class="red">C</span></Button>
        <Button  onClick={value=>this.handleSubmit({grade:"D",sid:row.original.sid,term:row.original.term,year:row.original.year,crn:row.original.crn,cno:row.original.cno},value)} value="D"><span class="red">D</span></Button>
        <Button  onClick={value=>this.handleSubmit({grade:"F",sid:row.original.sid,term:row.original.term,year:row.original.year,crn:row.original.crn,cno:row.original.cno},value)} value="F"><span class="red">F</span></Button>
        <Button  onClick={value=>this.handleSubmit({grade:"I",sid:row.original.sid,term:row.original.term,year:row.original.year,crn:row.original.crn,cno:row.original.cno},value)} value="I"><span class="red">I</span></Button>
        <Button  onClick={value=>this.handleSubmit({grade:"IP",sid:row.original.sid,term:row.original.term,year:row.original.year,crn:row.original.crn,cno:row.original.cno},value)} value="IP"><span class="red">IP</span></Button>
        <Button  onClick={value=>this.handleSubmit({grade:"A",sid:row.original.sid,term:row.original.term,year:row.original.year,crn:row.original.crn,cno:row.original.cno},value)} value="S"><span class="red">S</span></Button>
        <Button  onClick={value=>this.handleSubmit({grade:"U",sid:row.original.sid,term:row.original.term,year:row.original.year,crn:row.original.crn,cno:row.original.cno},value)} value="U"><span class="red">U</span></Button>
        </div> )
        
         
        }
    ]

    return (
      (this.props.degree == "")?<div></div>: <Reactable  data={data} columns={cols}  defaultPageSize = {5}        /> 
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
        placeholder="Department"
      /> 
    );
  }
}

class DegreePicker extends React.Component {
  render() {
    return (
      <DropdownList
        data={degrees}
        onChange={value => this.props.callbackParent("degree",value) }
        placeholder="Degree"
      /> 
    );
  }
}

class YearPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      years: []
    }
  }

  componentDidMount() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(jsondata) {
        this.setState({years:jsondata});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  render() {
    return (
      <DropdownList
        data={this.state.years}
        onChange={value => this.props.callbackParent("year",value) }
        placeholder="Year"
      /> 
    );
  }
}



export default Grade;