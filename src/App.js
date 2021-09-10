import React from 'react';
import './App.css';
import NavBar from './components/NavBar.js';
import AttendanceCard from './components/AttendanceCard.js';
import LoginPage from './components/loginPage.js';
import { Row, Col } from 'reactstrap';
import axios from 'axios';
import config from './config.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {"data": [{
        "courseName": "Loading",
        "courseCode": "Loading",
        "classesAttended": "Loading",
        "totalClasses": "Loading"
        }]
      },
      isUserLoggedIn: localStorage.getItem('isUserLoggedIn') || false,
    };
    this.loadData();
  }

  loadData() {
    axios.get(config.PROXY_URL + '/')
        .then( (response) => {
            this.setState({data: response});
        })
        .catch( (error) => {
            console.log(error);
        })
  }

  loginSucceed()
  {
    this.setState({isUserLoggedIn: true});
    localStorage.setItem('isUserLoggedIn', true);
  }

  logoutSucceed()
  {
    this.setState({isUserLoggedIn: false});
    localStorage.setItem('isUserLoggedIn', false);
  }

  onLoggedIn() {
    var renderData = this.state.data["data"]
    var cards = renderData.map(function(course, index) {
    return (
       <Col>
          <AttendanceCard courseName={course["courseName"]}
            courseCode={course["courseCode"]}
            classesAttended={course["classesAttended"]}
            totalClasses={course["totalClasses"]}
  	        reloadData={() => this.loadData()} />
        </Col>
            );
     });

      return (
      <div className="App">
        <NavBar onLogout={() => this.logoutSucceed()} />
        <Row sm="3">
          {cards}
        </Row>
      </div>
      );
  }

  onLoggedOut() {
      return (
        <div className="App">
        <LoginPage onLoginSuccess={() => this.loginSucceed()} />
        </div>
      );
  }

  render()
  {
    const isUserLoggedIn = this.state.isUserLoggedIn;
    console.log(isUserLoggedIn);
    if (isUserLoggedIn) {
      return this.onLoggedIn();
    }
    else {
      return this.onLoggedOut();
    }
  }
}

export default App;
