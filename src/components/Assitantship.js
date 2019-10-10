import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom';
import {Button} from 'react-mdl';
import axios from 'axios';
import {  MdDone,MdClear } from 'react-icons/md';
import {FaPowerOff} from 'react-icons/fa';
import Select from 'react-select';
import Reactable from "react-table";
import "react-table/react-table.css";
import DropdownList from 'react-widgets/lib/DropdownList';
import 'react-widgets/dist/css/react-widgets.css';
import $ from 'jquery';
const dept=[  {value: 'CSC',
          label: 'CSC'},{value: 'MATH',
          label: 'MATH'},{value: 'POLS',
          label: 'POLS'}];

class Assitantship extends React.Component {
    constructor(props){
    super(props);
    this.state={
   
        results:[],
        dept:''
    
    }
       this.processResults = this.processResults.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
     }
    processResults(students,department) {
    this.setState({results:students,dept:department}, () => {
        console.log(this.state.results);
    });
  }
    
     handleChange1(event) {
    this.setState({dept: event.value});  
   }
 


  render() {
      
 
    return (
        
          
            <div>
        <h6 align="right">    <Link to="/slatepage"><FaPowerOff size='40'/></Link>   </h6> 
        <h1 align="center">Award Assitantship for students </h1>
                   <GSRequest callbackParent={this.processResults}/> <br/>
        <GSResult results={this.state.results} />

</div>
    )
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
        var gradurl = "http://localhost:5000/ogms/assistantship/"+this.state.department;   
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

      handleSubmit(values,val) {
       val.preventDefault();
    var apiBaseUrl = "http://localhost:5000/ogms";
    var self = this;
      var payload={
          "sid":values.sid,
          "term":values.term,
          "year":values.year,
          "amount":17483
      }
   console.log(values)
    axios.post(apiBaseUrl+'/assistantship',payload).then(function (response) {
      console.log(response);
      if (response.status === 200) {
        if (response.data.Status) {
         
            
        }
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
           console.log(temp[i])        
       data.push({
           sid:temp[i][0],
           email: temp[i][1],
           program: temp[i][6],
      term: temp[i][2],
           year:temp[i][3],
           assitantshipstatus: temp[i][4]
        
     })
  }

    const columns = [
        
        {
            Header: 'SID',
            accessor: 'sid'
                },
       
        {
            Header: 'Email',
            accessor: 'email'
        },
        {
            Header: 'Program',
            accessor: 'program'
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
            Header: 'Assitantship Status',
            accessor: 'assitantshipstatus'
          
        },{
            Header: 'Decision',
            accessor: 'decision',
              Cell: row => (<div>
         <Button  onClick={value=>this.handleSubmit({status:"ACCEPT",sid:row.original.sid,term:row.original.term,year:row.original.year},value)} value="ACCEPT"><MdDone size='30'/></Button>
        <Button onClick={value=>this.handleSubmit({status:"REJECT",sid:row.original.sid,term:row.original.term,year:row.original.year},value)} value="REJECT"><MdClear size='30'/></Button></div> )
        
         
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



export default withRouter(Assitantship)
