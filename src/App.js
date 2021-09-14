import React from 'react';
import './App.css';
import NavBar from './components/NavBar.js';
import AttendanceCard from './components/AttendanceCard.js';
import LoginPage from './components/loginPage.js';
import { Row, Col } from 'reactstrap';
import axios from 'axios';
import config from './config.js';
import Cookies from 'js-cookie';

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
      isUserLoggedIn: JSON.parse(localStorage.getItem('isUserLoggedIn')) || false,
    };
  }

  componentDidMount() {
    //console.log(Cookies.get('bunkalog_session_id'));
    axios.get(config.PROXY_URL + '/user', {params: {'session_id': Cookies.get('bunkalog_session_id')}})
        .then( (response) => {
            this.setState({data: response});
        })
        .catch( (error) => {
            console.log(error);
        })
  }

  loginSucceed(response)
  {
    console.log(response);

    const requestOption = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      url: config.PROXY_URL + '/login',
      data: {response}
    }

    axios(requestOption)
      .then(function (response) {
        //console.log(response.data);
        const session_id = response.data;
        console.log(session_id);
        //console.log('response' + response);
        Cookies.set('bunkalog_session_id', session_id);
      })
/*      .then(data => {
        console.log('data ' + data);
      })*/
      .catch(function (error) {
        console.log(error);
      });

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
        <LoginPage onLoginSuccess={(response) => this.loginSucceed(response)} />
        </div>
      );
  }

  render()
  {
    const isUserLoggedIn = this.state.isUserLoggedIn;
    if (isUserLoggedIn) {
      return this.onLoggedIn();
    }
    else {
      return this.onLoggedOut();
    }
  }
}

export default App;
