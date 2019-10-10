import React, {Component} from 'react';
import axios from 'axios';
import {FaPowerOff} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ReactTable from "react-table";
import "react-table/react-table.css";

class ApplicationStatus extends Component {
     constructor(props){
    super(props);
    this.state={
     university:'',
      major:'',
      degree:'',
      dateofapp:'',
      year:'',
      term:'',
      admissionstatus:'',
        email:'',
        status:[]
    }
     }
    
    componentDidMount() {
       
       
    var apiBaseUrl = "http://localhost:5000/slate";
    var self = this;
     self.state.email = this.props.location.state.email;
    axios.get(apiBaseUrl+'/application/'+self.state.email)
    .then(function (response) {
    
   self.setState({
       status:response.data
      })
    console.log(self.state.status);    
 })     
    
    
    .catch(function (error) {
      console.log(error);
    });
  }
    
    
    render() {
        var temp=[]
    temp=this.state.status
        const data=[]    
 
    for(let i=0;i<temp.length;i++)
        {
            console.log(temp[0]);
        
       data.push({
      university: temp[i][1],
      department: temp[i][2],
      program: temp[i][3],
      dateapplied: temp[i][4],
      yearofadmi: temp[i][6],
      termofadmi: temp[i][5],
      admissionstatus: temp[i][7]
     })
  }
console.log(data)
    const columns = [
        {
            Header: 'University',
            accessor: 'university'
        },
        {
            Header: 'Department',
            accessor: 'department'
        },
        {
            Header: 'Program',
            accessor: 'program'
        },
        {
            Header: 'Term of Admission',
            accessor: 'termofadmi'
        },
        {
            Header: 'Year of Admission',
            accessor: 'yearofadmi'
        },
        {
            Header: 'Date Applied',
            accessor: 'dateapplied'
        },
        {
            Header: 'Admission Status',
            accessor: 'admissionstatus'
        }
    ]
        return (
            
            
            <div>
        <h6 align="right">  {this.props.location.state.email}  <Link to="/slatepage"><FaPowerOff size='40'/></Link>   </h6> 
        <h1 align="center">Application Status</h1>
              <ReactTable
                data={data}
                columns={columns}
                defaultPageSize = {5}
              />
          </div>
         
        )
    }
    
    
}

export default ApplicationStatus;