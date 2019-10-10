import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import {Layout, Header, Navigation, Drawer, Content} from 'react-mdl';
import Main from './components/main';
import { Link } from 'react-router-dom';
import {  IoMdHome } from 'react-icons/io';
import Particles  from "react-particles-js";

class App extends Component {
  render() {
    return (
        <div className="demo-big-content">

            <Layout>
                <Header className="header-color" title={<span><span style={{ color: '#7dd' }}><Link to='/'><IoMdHome size='25' color ="white"/></Link></span><strong>   UNH Portal</strong></span>}>
                    <Navigation>
                        <Link to="/slatepage">Student</Link>
                        <Link to="/pawspage">Faculty</Link>
                    </Navigation>
                </Header>
                
                <Content>
                    <Main />
                </Content>
            </Layout>
        </div> 
    );
  }
}

export default App;