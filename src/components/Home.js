import React, {Component} from 'react';
//import { Textfield } from 'react-mdl';
import { Button } from 'react-mdl';
import { Card, CardTitle, CardText, CardActions, CardMenu  } from 'react-mdl';
import { Link } from 'react-router-dom';



class Home extends Component {
    render() {
        return (
          <div>
            <Card shadow={0} style={{width: '512px', margin: 'auto'}}>
    <CardTitle style={{color: 'black', height: '176px', align:'center'}}>University of New Haven</CardTitle>
    <CardText style = {{color: 'black'}}>
            <p><strong>WELCOME!</strong></p>
            <th><strong>Access all information from our portal.</strong></th>
            <div><ul>Students
                    <li>Manage student activities</li>
                    <li>Add/Drop courses</li>
                    <li>Manage coursse schedules</li></ul></div>
            <div><ul>Faculty
                    <li>Award Grades</li>
                    <li>View Student List</li></ul></div>
            
    </CardText>


</Card>
          </div>
        )
    }
}

export default Home;