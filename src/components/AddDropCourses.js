import React, { Component } from 'react';
import MultiSelectBox from 'react-multiselect-box';
import 'react-multiselect-box/build/css/index.css';
import axios from 'axios' 
 import { Link } from 'react-router-dom'
import {FaPowerOff,FaRegSave,FaArrowLeft} from 'react-icons/fa';
import {Button} from 'react-mdl';
import Select from 'react-select';
import Reactable from "react-table";
import 'react-widgets/dist/css/react-widgets.css';
import DropdownList from 'react-widgets/lib/DropdownList';
import $ from 'jquery';

var term=['SU','FA','SP'];
var Table = Reactable.Table;
var options=[];

class AddDropCourses extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
        selectedList: [],
        courses:[],
        term:"",
        year:"",
        dept:"",options:""
    }
    this.processResults = this.processResults.bind(this);
  }
  processResults(tm,yr,stats) {
    this.setState({courses:stats, term:tm,year:yr[0]}, () => {
      
    });

    options=[] 
    var allcourses=[]
    allcourses=this.state.courses
        
    for(let i=0;i<allcourses.length;i++)
    {
        options.push({
         desc: allcourses[i][15]+" "+allcourses[i][3]+" "+allcourses[i][4]+" "+allcourses[i][7]+" "+allcourses[i][8] +" "+allcourses[i][9]+" "+allcourses[i][11],
          value: allcourses[i][2]+""+allcourses[i][14]
         })
    }
      this.setState({options:options});
  }

  render() {
    return (
      <div>
       <table>
        <tr ><td>
        </td>
        <td width="1500px"><h6 align="right">   <Link to="/pawspage"><FaPowerOff size='40'/></Link>   </h6></td></tr> </table>
        
        <h1 align="center">Add Courses</h1>
        <GSRequest callbackParent={this.processResults} dept={this.props.location.state.department}  />
       <GSResult term={this.state.term} year={this.state.year} sid={this.props.location.state.sid}  courses={this.state.results} options={this.state.options} />
      </div>
    );
  }
}
class GSRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      year: ""
    }
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(fld,val) {
    var x = {};
    if (fld == "term")
      x["term"] = val;
    else
      x["year"] = val;
      
    this.setState(x, () => {
      if ((this.state.term != "") && (this.state.year != "")) {
          
        var gradurl = "http://localhost:5000/paws/getCourses/"+this.state.term+"/"+this.state.year+"/"+this.props.dept;
          console.log(gradurl);
         $.ajax({
          url: gradurl,
          dataType: 'json',
          cache: false,
          success: function(jsondata) {
            this.props.callbackParent(this.state.term,this.state.year,jsondata);
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
                <TermPicker 
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

    constructor(props) {
    super(props)
    this.state = {
        selectedList: []
    }
   }
   saveList(values,val){
       
    var apiBaseUrl = "http://localhost:5000/paws";
    var self = this;
    
   for(let i=0;i<values.selectedList.length;i++)
        {
           
        var c=values.selectedList[i];
        
        
    var payload = {
      "crn":c.substring(0,5),
      "term":this.props.term,
        "year":this.props.year,
        "grade":"I",
        "sid":this.props.sid,
        "cno":c.substring(5,9)
    }
    console.log(payload);
      axios.post(apiBaseUrl+'/enroll', payload).then(function (response) {
      console.log(response);
      if (response.status === 200) {
        if (response.data.status) {
             
        }
          }
     
   })
   .catch(function (error) {
     console.log(error);
    });
        
        }
       // this.state.selectedList=[]
       alert("Courses added successfully")
       
       
    }
    render(){
    const { selectedOne, selectedList } = this.state
 
    return (
      <div className="container">        
        <MultiSelectBox
          options={options}
          labelKey="desc"
          valueKey="value"
          valueArray={selectedList}
          onAdd={selectedItem => {
            this.setState({
              selectedList: [...this.state.selectedList, selectedItem.value]
            })
          }}
          onRemove={(removedItem, index) => {
            this.setState({
              selectedList: [
                ...this.state.selectedList.filter(
                  item => item !== removedItem.value
                )
              ]
            })
          }}
          onSelectAll={selectedItems => {
            this.setState({
              selectedList: [
                ...this.state.selectedList,
                ...selectedItems.map(item => item.value)
              ]
                       
            })
          }}
          onRemoveAll={() =>
            this.setState({
              selectedList: []
            })
          }
        />
        <br /> 
        <h1 align="center"><Button onClick= {value=>this.saveList({selectedList:this.state.selectedList},value)}><FaRegSave size='40'/></Button></h1>
      </div>
    )
  }
}

    
   
    
    
class TermPicker extends React.Component {
  render() {
    return (
      <DropdownList
        data={term}
        onChange={value => this.props.callbackParent("term",value) }
        placeholder="Term"/> 
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
        placeholder="Year"/> 
    );
  }
}


export default AddDropCourses