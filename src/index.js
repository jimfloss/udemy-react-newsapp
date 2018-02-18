import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Javascript from './components/Javascript';
import Python from './components/Python';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import './index.css';

const About = () =>
<div>
  <h1>This is the about page&hellip;</h1>
</div>

const Root = () =>
<Router>
  <div>
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">NEWSAPP</Link>
        </Navbar.Brand>
        <Navbar.Toggle/>
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavItem to="/" activeclassname="active">Home</NavItem>
          <NavItem to="/javascript" activeclassname="active">JavaScript</NavItem>
          <NavItem to="/python" activeclassname="active">Python</NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>

    <Route exact path="/" component={ App } />
    <Route exact path="/javascript" component={ Javascript } />
    <Route exact path="/python" component={ Python } />
  </div>
</Router>

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
