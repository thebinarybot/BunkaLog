import React from 'react';
import logo from './logo.svg';
import {Component} from 'react';
import './App.css';
import { gapi } from 'gapi-script';
import NavBar from './components/NavBar.js';
import AttendanceCard from './components/AttendanceCard.js';
import { Row, Col } from 'reactstrap';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,
    }
    this.state = {
      isSignedIn: false,
      data: {"data": [{
        "courseName": "Loading",
        "courseCode": "Loading",
        "classesAttended": "Loading",
        "totalClasses": "Loading"
        }]
      },
    };
    this.loadData();
  }

  loadData() {
    axios.get("http://192.168.86.129:5000/")
        .then( (response) => {
            this.setState({data: response});
        })
        .catch( (error) => {
            console.log(error);
        })
  }


  componentDidMount() {

    const successCallback = this.onSuccess.bind(this);
    
    window.gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '724928841047-2a73bpb9m7hat1v4rhdrkefrtaedmp26.apps.googleusercontent.com',
      })

      // this.auth2.attachClickHandler(document.querySelector('#loginButton'), {}, this.onLoginSuccessful.bind(this))

      this.auth2.then(() => {
        console.log('on init');
        this.setState({
          isSignedIn: this.auth2.isSignedIn.get(),
        });
      });
    });    

    window.gapi.load('signin2', function() {
      // Method 3: render a sign in button
      // using this method will show Signed In if the user is already signed in
      var opts = {
        width: 200,
        height: 50,
        client_id: 'YOUR_CLIENT_ID.apps.googleusercontent.com',
        onsuccess: successCallback
      }
      gapi.signin2.render('loginButton', opts)
    })
  }

  onSuccess() {
    console.log('on success')
    this.setState({
      isSignedIn: true,
      err: null
    })
  }

  onLoginFailed(err) {
    this.setState({
      isSignedIn: false,
      error: err,
    })
  }

  getContent() {
    if (this.state.isSignedIn) {
      return <p>hello user, you're signed in </p>
    } else {
      return (
        <div>
          <p>You are not signed in. Click here to sign in.</p>
          <button id="loginButton">Login with Google</button>
        </div>
      )
    }
    
  }
  
  render()
  {
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
        <NavBar />
        <Row sm="3">
          {cards}
        </Row>
        {this.getContent()}           
        <p> {this.state.data["data"]["courseName"]} </p>
      </div>
  );
  }
}

export default App;
