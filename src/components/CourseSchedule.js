import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import axios from 'axios';
import ReactTable from "react-table";
import "react-table/react-table.css";
import {FaPowerOff} from 'react-icons/fa';

class CourseSchedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = 
        {
         term: '',
         year: '',
         crn: '',
         dept: '',
         cno: '',
         section: '',
         days: '',
         stime: '',
         etime: '',
         room: '',
         cap: '',
         instructor: '',
         auth: '',
         cname: '',
         credit: '',
         row:'',course:[]
        }
     
  }

componentDidMount() {
    var apiBaseUrl = "http://localhost:5000/paws/view_schedule";
    var self = this;
    var sid = this.props.location.state.sid;
    axios.get(apiBaseUrl+'/'+sid).then(function (response) {
               
        self.setState({  
            row:response.data,
              term:response.data.term,
              year:response.data.year,
              crn:response.data.crn,
              dept:response.data.dept,
              cno:response.data.cno,
              section:response.data.section,
              days:response.data.days,
              stime:response.data.stime,
              etime:response.data.etime,
              room:response.data.room,
              cap:response.data.cap,
              instructor:response.data.instructor,
              auth:response.data.auth,
              cname:response.data.cname,
              credit:response.data.credit,
            course:response.data
          })
    
    })     
    .catch(function (error) {
      console.log(error);
    });
}
  

render() {

    var temp=[]
    temp=this.state.course
   
         const data=[]   
         
    for(let i=0;i<temp.length;i++)
        {
        
        
       data.push({
      term: temp[i][0],
      year: temp[i][1],
      crn: temp[i][2],
      cno: temp[i][4],
      credits: temp[i][16],
      cname: temp[i][15],
      days: temp[i][6],
      timings: temp[i][7]+" - "+temp[i][8],
      room: temp[i][9],
      cap:temp[i][10],
      ins: temp[i][11]
     })
  }
console.log(data)
    const columns = [
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
            Header: 'Credits',
            accessor: 'credits'
        },
        {
            Header: 'Cname',
            accessor: 'cname',
            width:250
        },
        {
            Header: 'Days',
            accessor: 'days'
        },
        {
            Header: 'Timings',
            accessor: 'timings'
        },
        {
            Header: 'Room',
            accessor: 'room'
        },
        {
            Header: 'Cap',
            accessor: 'cap'
        },
        {
            Header: 'Instructor',
            accessor: 'ins'
        },
    ]

    return (
        
          <div width='400px'>
        <h6 align="right">  {this.props.location.state.name}  <Link to="/pawspage"><FaPowerOff size='40'/></Link>   </h6> 
        <h3 align="center">Course Schedule</h3>
              <ReactTable
                data={data}
                columns={columns}
                defaultPageSize = {5}
              />
          </div>  
        
    )
  }
}

export default withRouter(CourseSchedule)


